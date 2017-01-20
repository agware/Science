/**
 * Created by war434 on 18/01/2017.
 */

function initInputsDrag () {

    for (var i = 0; i < inputs.length; i++) {

        const r = {'fixed': 8, 'draggable': 15};
        const offset = {'x': 20, 'gap': 120/inputs.length + 80, 'text': 50, 'arrow': 5, 'shift': 3};
        const underline = {'x': 25, 'y': 10, 'len': 75};
        var scalingFactor = 4;

        d3.select('#inputsDragG')
            .datum(scalingFactor)
            .append('g')
            .attr('transform',  'translate(' + offset.x + ',' + (i*offset.gap) + ')')
            .attr('id', inputs[i].id + 'G');

        if (inputs[i].id == 'tLim') {
            scalingFactor = scalingFactor*5;
        }

        d3.select('#' + inputs[i].id + 'G').append('text')
            .attr('x', offset.text)
            .text(inputs[i].name)
            .style('font-size', '40px');

        d3.select('#' + inputs[i].id + 'G').append('line')
            .attr('transform', 'translate(' + underline.x + ',' + underline.y + ')')
            .attr('x2', underline.len);

        initHorizontal();
        initVertical();

        function initHorizontal () {
            const horizontalOffset = {'x': 20, 'y': 45, 'text': 16};
            var lineLen = inputs[i].val[0]*scalingFactor;

            d3.select('#' + inputs[i].id + 'G').append('g')
                .attr('transform', 'translate(' + horizontalOffset.x + ',' + horizontalOffset.y + ')')
                .attr('id', inputs[i].id + 'HorizontalG');

            d3.select('#' + inputs[i].id + 'HorizontalG').append('text')
                .attr('x', -horizontalOffset.text)
                .attr('y', -horizontalOffset.text)
                .attr('id', inputs[i].id + 'HorizontalText')
                .text(inputs[i].val[0] + inputs[i].measure);

            d3.select('#' + inputs[i].id + 'HorizontalG').append('line')
                .attr('x2', lineLen)
                .attr('id', inputs[i].id + 'HorizontalLine');

            d3.select('#' + inputs[i].id + 'HorizontalG').append('g')
                .attr('transform', 'translate(' + (lineLen) + ',0)')
                .attr('id', inputs[i].id + 'HorizontalDraggableG');

            d3.select('#' + inputs[i].id + 'HorizontalDraggableG').append('g')
                .attr('id', inputs[i].id + 'HorizontalArrowHead')
                .selectAll('line')
                .data(d3.range(2))
                .enter().append('line')
                .attr('x2', -offset.arrow)
                .attr('y2', function (d) {return (d ? -1 : 1) * offset.arrow; });

            if (inputs[i].numDraggable == 2) {
                d3.select('#' + inputs[i].id + 'HorizontalDraggableG').append('circle')
                    .attr('cx', -offset.arrow + offset.shift)
                    .attr('r', r.draggable)
                    .attr('id', inputs[i].id + 'HorizontalDragBall')
                    .classed('clickable', true)
                    .style('fill-opacity', 0.4)
                    .datum(scalingFactor)
                    .call(d3.drag()
                        .on('start', dragStart)
                        .on('drag', dragHorizontalUpdate)
                        .on('end', dragEnd));
            }
        }

        function initVertical () {
            const verticalOffset = {'x': 115, 'y': 80, 'text': 20};
            var lineLen = -inputs[i].val[1]*scalingFactor;
            var negArrow = lineLen > 0 ? 1 : 0;
            var arrowShift = 0;
            arrowShift -= inputs[i].id == 'a' ? 45 : 0;
            arrowShift -= inputs[i].id == 'vLim' ? 30 : 0;

            d3.select('#' + inputs[i].id + 'G').append('g')
                .attr('transform', 'translate(' + verticalOffset.x + ',' + (verticalOffset.y + arrowShift) + ')')
                .attr('id', inputs[i].id + 'VerticalG');

            d3.select('#' + inputs[i].id + 'VerticalG').append('text')
                .attr('x', -verticalOffset.text + (inputs[i].id == 'vLim' ? 23 : 0))
                .attr('y', verticalOffset.text*(negArrow ? -0.2 : 1))
                .attr('id', inputs[i].id + 'VerticalText')
                .text(inputs[i].val[1] + inputs[i].measure);

            d3.select('#' + inputs[i].id + 'VerticalG').append('line')
                .attr('y2', lineLen)
                .attr('id', inputs[i].id + 'VerticalLine');

            d3.select('#' + inputs[i].id + 'VerticalG').append('g')
                .attr('transform', 'translate(0,' + (lineLen) + ')')
                .attr('id', inputs[i].id + 'VerticalDraggableG');

            d3.select('#' + inputs[i].id + 'VerticalDraggableG').append('g')
                .attr('id', inputs[i].id + 'VerticalArrowHead')
                .selectAll('line')
                .data(d3.range(2))
                .enter().append('line')
                .attr('x2', function (d) {return (d ? -1 : 1) * offset.arrow; })
                .attr('y2', offset.arrow*(negArrow ? -1 : 1));

            if (inputs[i].numDraggable > 0) {
                d3.select('#' + inputs[i].id + 'VerticalDraggableG').append('circle')
                    .attr('cy', (-offset.arrow + offset.shift)*(negArrow ? 1 : -1))
                    .attr('r', r.draggable)
                    .attr('id', inputs[i].id + 'VerticalDragBall')
                    .classed('clickable', true)
                    .style('fill-opacity', 0.4)
                    .datum(scalingFactor)
                    .call(d3.drag()
                        .on('start', dragStart)
                        .on('drag', dragVerticalUpdate)
                        .on('end', dragEnd));
            }
        }
    }
}

function initHeightDrag () {
    const arrowOffset = 10;
    var r = d3.select('#ball').attr('r');

    d3.select('#ball')
        .classed('clickable', true)
        .call(d3.drag()
            .on('start', dragStart)
            .on('drag', dragHeightUpdate)
            .on('end', dragEnd));

    d3.select('#frameG').append('g')
        .attr('id', 'bottomArrowHead');

    d3.select('#bottomArrowHead').selectAll('line')
        .data(d3.range(2))
        .enter().append('line')
        .attr('x2', function (d) {return (d ? -1 : 1) * arrowOffset; })
        .attr('y2', -arrowOffset);

    d3.select('#frameG').append('line')
        .attr('id', 'heightLine');

    d3.select('#ballG').append('g')
        .attr('transform', 'translate(0,' + r + ')')
        .attr('id', 'topArrowHead');

    d3.select('#topArrowHead').selectAll('line')
        .data(d3.range(2))
        .enter().append('line')
        .attr('x2', function (d) {return (d ? -1 : 1) * arrowOffset; })
        .attr('y2', arrowOffset);

    d3.select('#frameG').append('text')
        .attr('transform', 'translate(' + 3 + ',' + 10 + ')')
        .attr('id', 'heightText');

    updateVars();
}

function dragStart() {
    d3.select(this).classed('active', true);
}

function dragHorizontalUpdate () {
    var id = d3.select(this).attr('id');
    id = id.substring(0, id.length - 'HorizontalDragBall'.length);

    var lim = {'min': 0, 'max': 50};
    if (id == 'tLim') {
        var scalingFactor = d3.select('#inputsDragG').datum()*5;
        var u = inputs[matchToObject('u', inputs)].val[1];
        lim.min = Math.max(((10 - u)/(-9.8))*scalingFactor, 0);
        lim.max = ((-10 - u)/(-9.8))*scalingFactor;
    }

    var oldOffset = d3.select('#' + id + 'HorizontalDraggableG').attr('transform');
    oldOffset = parseInt(oldOffset.substring('translate('.length, oldOffset.length - ',0)'.length));

    var tempInput = Math.max(Math.min(d3.event.x + oldOffset, lim.max), lim.min);

    dragUpdate(0, id, tempInput);

    var tiedFlag = checkIfTied(id);
    if(tiedFlag) {updateTiedInputs(0, id, tempInput); }

    updateVars();
}

function dragVerticalUpdate () {

    var id = d3.select(this).attr('id');
    id = id.substring(0, id.length - 'VerticalDragBall'.length);

    var lim = {'min': 0, 'max': 80};
    if (id == 'vLim') {
        lim.min = -40;
        lim.max = 40;
    } else if (id == 'tLim') {
        var scalingFactor = d3.select('#inputsDragG').datum()*5;
        var u = inputs[matchToObject('u', inputs)].val[1];
        lim.min = Math.max(((10 - u)/(-9.8))*scalingFactor, 0);
        lim.max = ((-10 - u)/(-9.8))*scalingFactor;
    }

    var oldOffset = d3.select('#' + id + 'VerticalDraggableG').attr('transform');
    oldOffset = parseInt(oldOffset.substring('translate(0,'.length, oldOffset.length - ')'.length));

    var tempInput = Math.max(Math.min(-(d3.event.y + oldOffset), lim.max), lim.min);

    dragUpdate(1, id, tempInput);

    var tiedFlag = checkIfTied(id);
    if(tiedFlag) {updateTiedInputs(1, id, tempInput); }

    updateVars();
}

function dragUpdate(direction, id, input) {
    var directionName = direction ? 'Vertical' : 'Horizontal';

    var attrSelect = direction ? 'y2' : 'x2';
    d3.select('#' + id + directionName + 'Line').attr(attrSelect, input*(direction ? -1 : 1));
    var transform = direction ? 'translate(0,' + (-input) + ')' : 'translate(' + (input) + ',0)';
    d3.select('#' + id + directionName + 'DraggableG').attr('transform', transform);

    var scalingFactor = d3.select('#inputsDragG').datum();
    if (id == 'tLim') {
        scalingFactor = 5*scalingFactor;
        input = Math.round(input*100/scalingFactor)/100;
    } else if (id == 'vLim' && direction) {
        input = Math.round(input*10/scalingFactor)/10;
    } else {
        input = Math.round(input/scalingFactor);
    }
    var index = matchToObject(id, inputs);
    inputs[index].val[direction] = input;
    d3.select('#' + id + directionName + 'Text').text(input + inputs[index].measure);
    console.log(d3.select('#' + id + directionName + 'ArrowHead').attr('id'));
    d3.select('#' + id + directionName + 'ArrowHead').attr('transform', 'rotate(' + (input < 0 ? 180 : 0) + ')');
}

function dragHeightUpdate () {
    var r = d3.select('#ball').attr('r');
    var lim = {'min': r, 'max': d3.select('#animationSvg').attr('height') - r};

    var oldOffset = d3.select('#ballG').attr('transform');
    oldOffset = parseInt(oldOffset.substring(matchToString(',', oldOffset) + 1, oldOffset.length - ')'.length));

    var input = Math.max(Math.min(-(d3.event.y+oldOffset), lim.max), lim.min) - r;
    var scalingFactor = d3.select('#ball').datum();
    heightInput.val[1] = input/scalingFactor;

    d3.select('#bottomArrowHead').classed('hidden', input < 45);
    d3.select('#heightText').classed('hidden', input < 30);

    updateVars();
}

function dragEnd() {
    d3.select(this).classed('active', false);
}

function checkIfTied (id) {
    var ret = false;

    if (id == 'u') {
        ret = matchToObject('vLim', inputs) >= 0;
    } else if (id == 'vLim') {
        ret = matchToObject('tLim', inputs) >= 0;
    } else if (id == 'tLim') {
        ret = matchToObject('vLim', inputs) >= 0;
    }

    return ret;
}

function updateTiedInputs (direction, id, input) {
    var scalingFactor = d3.select('#inputsDragG').datum();
    var opDirection = direction ? 0 : 1;

    if (id == 'u') {
        var tempInput = Math.round(input/scalingFactor);
        if (!direction) {
            dragUpdate(direction, 'vLim', input);
        } else {
            var vLim = inputs[matchToObject('vLim', inputs)].val[direction];
            if (vLim > tempInput) {
                dragUpdate(direction, 'vLim', tempInput*scalingFactor);
                vLim = tempInput;
            }
            // v=u+at
            var a = -9.8;
            var tLim = (vLim - tempInput)/a;
            dragUpdate(direction, 'tLim', tLim*scalingFactor*5);
            dragUpdate(opDirection, 'tLim', tLim*scalingFactor*5);
        }
    } else if (id == 'vLim') {
        var tempInput = Math.round(input*10/scalingFactor)/10;
        var u = inputs[matchToObject('u', inputs)].val[direction];
        if (tempInput > u) {
            dragUpdate(direction, 'vLim', u*scalingFactor);
            tempInput = u;
        }
        var a = -9.8;
        // v = u+at
        var tLim = (tempInput - u)/a;
        dragUpdate(direction, 'tLim', tLim*scalingFactor*5);
        dragUpdate(opDirection, 'tLim', tLim*scalingFactor*5);

    } else if (id == 'tLim') {
        var tempInput = Math.round(input*100/(5*scalingFactor))/100;
        dragUpdate(opDirection, 'tLim', input);
        var u = inputs[matchToObject('u', inputs)].val[1];
        var a = -9.8;
        // v = u+at
        var vLim = u + a*tempInput;
        dragUpdate(1, 'vLim', vLim*scalingFactor);
    }
}

