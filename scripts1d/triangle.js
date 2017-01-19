/**
 * Created by war434 on 17/01/2017.
 */

function initTriangle() {

    const scalingFactor = 25;
    d3.select('#triangleG').datum(scalingFactor);

    initTriangleContainers();
    initArrowHead();
    initLineBody();
    initText();
    initBall();
    if (!d3.select('#trigRadioG').empty()) { initCurve(); }

    var x = inputs[matchToObject('a', inputs)].val*scalingFactor;
    var y = inputs[Math.max(matchToObject('b', inputs), matchToObject('o', inputs))].val*scalingFactor;
    updateTriangle(x, y);

    function initTriangleContainers() {

        d3.select('#triangleG').append('g')
            .attr('id', 'triangleRightG');

        d3.select('#triangleRightG').append('g')
            .attr('id', 'triangleTopG');

        d3.select('#triangleG').append('g')
            .attr('id', 'velocityG');

        d3.select('#velocityG').append('g')
            .attr('id', 'velocityArrowHead');
    }

    function initArrowHead() {
        const arrowOffset = 10;

        // horizontal line arrowHead
        d3.select('#triangleRightG').selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', -arrowOffset)
            .attr('y2', function(d) {return (d ? -1 : 1)*arrowOffset; })
            .classed('split', true);

        // vertical line arrowhead
        d3.select('#triangleTopG').selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', function(d) {return (d ? -1 : 1)*arrowOffset; })
            .attr('y2', arrowOffset)
            .classed('split', true);

        // vector arrowHead
        d3.select('#velocityArrowHead').selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', -arrowOffset)
            .attr('y2', function(d) {return (d ? -1 : 1)*arrowOffset; });
    }

    function initLineBody() {
        // horizontal line
        d3.select('#triangleG').append('line')
            .attr('id', 'horizontalVel')
            .classed('split', true)
            .classed('splitLine', true);

        // vertical line
        d3.select('#triangleRightG').append('line')
            .attr('id', 'verticalVel')
            .classed('split', true)
            .classed('splitLine', true);

        // vector line
        d3.select('#velocityG').append('line')
            .attr('id', 'vectorLineBody');
    }

    function initText() {

        const textOffset = {'horizontal': 18, 'vertical': 5, 'velocity': -5};

        d3.select('#triangleG').append('text')
            .attr('y', textOffset.horizontal)
            .attr('id', 'textX');
        d3.select('#triangleRightG').append('text')
            .attr('x', textOffset.vertical)
            .attr('id', 'textY');
        d3.select('#velocityG').append('text')
            .attr('y', textOffset.velocity)
            .attr('id', 'textVel');

    }

    function initBall() {

        const ball = {'fixedR': 7, 'dragR': 15};

        // fixed ball
        d3.select('#triangleG').append('circle')
            .attr('r', ball.fixedR)
            .style('fill', '#000');
        // draggable ball
        d3.select('#triangleG').append('circle')
            .attr('r', ball.dragR)
            .attr('id', 'dragBall')
            .style('fill-opacity', 0.3)
            .classed('clickable', true)
            .call(d3.drag()
                .on("start", dragStart)
                .on("drag", dragUpdate)
                .on("end", dragEnd));
    }

    function initCurve() {

        d3.select('#triangleG').append('text')
            .attr('id', 'textAngle')
            .style('font-size', '16px');

        d3.select('#triangleG').append('g')
            .attr('id', 'angleCurve');
        d3.select('#angleCurve').append('clipPath')
            .attr('id', 'clipAngle')
            .append('path')
            .attr('id', 'clipPath');
        d3.select('#angleCurve').append('circle')
            .attr('r', 30)
            .attr('clip-path', 'url(#clipAngle)')
            .style('fill-opacity', 0)
            .style('stroke-opacity', 1)
            .style('stroke', '#000')
            .style('stroke-width', '2px');
    }
}

function dragStart() {
    d3.select(this).classed("active", true);
}

function dragUpdate() {

    var lim;
    if (matchToObject('θ', vars) >= 0) {
        lim = {'minX': 110, 'minY': 110, 'maxX': 225, 'maxY': 225};
    } else {
        lim = {'minX': 60, 'minY': 60, 'maxX': 225, 'maxY': 225};
    }

    var aIndex = matchToObject('a', inputs);
    var oIndex = Math.max(matchToObject('b', inputs), matchToObject('o', inputs));

    inputs[aIndex].val = Math.max(Math.min(d3.event.x, lim.maxX), lim.minX);
    inputs[oIndex].val = Math.max(Math.min(-d3.event.y, lim.maxY), lim.minY);

    updateVars();
}

function dragEnd() {
    d3.select(this).classed("active", false);
}

function updateTriangle () {

    const dragOffset = 4;
    const rad2deg = 180/Math.PI;
    const deg2rad = 1/rad2deg;

    var aIndex = matchToObject('a', inputs);
    var oIndex = Math.max(matchToObject('b', inputs), matchToObject('o', inputs));

    var x = inputs[aIndex].val;
    var y = inputs[oIndex].val;

    var aIndexVars = matchToObject('a', vars);
    var oIndexVars = Math.max(matchToObject('b', vars), matchToObject('o', vars));
    var hIndexVars = Math.max(matchToObject('c', vars), matchToObject('h', vars));
    var thetaIndexVars = matchToObject('θ', vars);

    var vel = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
    var angle = Math.atan(y/x)*rad2deg;

    d3.select('#dragBall')
        .attr('cx', x - dragOffset*Math.cos(angle*deg2rad))
        .attr('cy', -y + dragOffset*Math.sin(angle*deg2rad));

    d3.select('#clipPath').attr('d', 'M ' + 0 + ' ' + 0 + ' L ' + x + ' ' + 0 + ' L ' + x + ' ' + (-y) + ' Z');

    updateContainers();
    updateLineBodies();
    updateText();
    if (thetaIndexVars >= 0) {updateAngle(); }


    function updateContainers() {

        d3.select('#triangleRightG').attr('transform', 'translate(' + x + ',0)');
        d3.select('#triangleTopG').attr('transform', 'translate(0,' + (-y) + ')');
        d3.select('#velocityG').attr('transform', 'rotate(' + (-angle) + ')');
        d3.select('#velocityArrowHead').attr('transform', 'translate(' + vel + ',0)');

    }

    function updateLineBodies() {

        d3.select('#vectorLineBody').attr('x2', vel);
        d3.select('#horizontalVel').attr('x2', x);
        d3.select('#verticalVel').attr('y2', -y);

    }

    function updateText() {

        const textOffset = 20;

        d3.select('#textX')
            .attr('x', x/2 - textOffset)
            .text(vars[aIndexVars].id + ' = ' + vars[aIndexVars].val);
        d3.select('#textY')
            .attr('y', -y/2 + textOffset/2)
            .text(vars[oIndexVars].id + ' = ' + vars[oIndexVars].val);
        d3.select('#textVel')
            .attr('x', vel/2 - (3/2)*textOffset)
            .text(vars[hIndexVars].id + ' = ' + vars[hIndexVars].val);
    }

    function updateAngle () {

        d3.select('#textAngle')
            .attr('x', 35 + Math.max(0, 2*vars[aIndexVars].val - 2*vars[oIndexVars].val))
            .attr('y', -5)
            .text(vars[thetaIndexVars].id + ' = ' + vars[thetaIndexVars].val + '°');

        d3.select('#clipPath').attr('d', 'M ' + 0 + ' ' + 0 + ' L ' + x + ' ' + 0 + ' L ' + x + ' ' + (-y) + ' Z');
    }
}