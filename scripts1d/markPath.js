/**
 * Created by war434 on 16/01/2017.
 */

function initDots (dims) {

    const dots = {'r': 8, 'offset': 60};
    const arrowOffset = 10;
    const dotScalingFactor = 15;

    d3.select('#ballG').append('g')
        .attr('transform', 'translate(0,' + (-dots.offset) + ')')
        .attr('id', 'dots')
        .datum(dotScalingFactor);

    d3.select('#dots').selectAll('g')
        .data(d3.range(dims.num))
        .enter().append('g')
        .attr('id', function(d) {return 'dots' + d; });

    for(var j = 0; j < dims.num; j++) {
        d3.select('#dots' + j).append('circle')
            .attr('r', dots.r)
            .style('fill', '#000');

        if (dims.top == 'v') {
            d3.select('#dots' + j).append('line')
                .attr('id', 'dotLineBody' + j);
            d3.select('#dots' + j).append('g')
                .attr('id', 'arrowHead' + j)
                .selectAll('line')
                .data(d3.range(2))
                .enter().append('line')
                .attr('x2', -arrowOffset)
                .attr('y2', function(d) {return (d ? -1 : 1) * arrowOffset; });
        }

        var dotText = [{'x': -20, 'y': -20, 'id': 'topText' + j},
                       {'x': -5, 'y': 2*dots.offset, 'id': 'bottomText' + j}];
        d3.select('#dots' + j).selectAll('text')
            .data(dotText)
            .enter().append('text')
            .attr('x', function(d) {return d.x; })
            .attr('y', function(d) {return d.y; })
            .attr('id', function(d) {return d.id});

        d3.select('#topText' + j).datum(dims.top);
        d3.select('#bottomText' + j).datum(dims.bottom);
    }
}

function updateDots() {

    var numDots = d3.select('#dots').selectAll('circle').size();

    if (numDots == 2) {
        updatePairedDots();
    } else {
        updateSpacedDots(numDots);
    }

}

function updateSpacedDots(numDots) {

    var scalingFactor = d3.select('#ball').datum();
    var dotScalingFactor = d3.select('#dots').datum();

    var u = vars[matchToObject('u', vars)].val;
    var a = vars[matchToObject('a', vars)].val;

    var topType = d3.select('#topText0').datum();
    var bottomType = d3.select('#bottomText0').datum();

    for (var i = 0; i < numDots; i++) {
        // x = ut + (1/2)at^2
        var x = (u*i + (1/2)*a*Math.pow(i,2));
        // v = u + at
        var v = u + a*i;
        d3.select('#dots' + i)
            .transition()
            .duration(750)
            .attr('transform', 'translate(' + (x*scalingFactor) + ',0)');

        if (topType == 'v') {
            d3.select('#dotLineBody' + i)
                .transition()
                .attr('x2', v*dotScalingFactor);
            d3.select('#arrowHead' + i)
                .transition()
                .attr('transform', 'translate(' + (v*dotScalingFactor) + ',0)');

            d3.select('#dotLineBody' + i)
                .classed('hidden', v < 1);
            d3.select('#arrowHead' + i)
                .classed('hidden', v < 1);

            d3.select('#topText' + i).text(v + 'm/s');
        } else if (topType == 'x') {
            d3.select('#topText' + i).text(x + 'm');
        }

        if (bottomType == 't') {
            d3.select('#bottomText' + i).text(i + 's');
        } else if (bottomType == 'x') {
            d3.select('#bottomText' + i).text(x + 'm');
        }
    }
}

function updatePairedDots() {

    var scalingFactor = d3.select('#ball').datum();
    var dotScalingFactor = d3.select('#dots').datum();

    var u = vars[matchToObject('u', vars)].val;
    var a = vars[matchToObject('a', vars)].val;
    var xLim = vars[matchToObject('xLim', vars)].val;

    var topType = d3.select('#topText0').datum();
    var bottomType = d3.select('#bottomText0').datum();

    d3.select('#dots1')
        .transition()
        .duration(750)
        .attr('transform', 'translate(' + (xLim*scalingFactor) + ',0)');

    if (topType == 'v') {
        // v^2 = u^2 + 2*a*x
        var v = Math.round(Math.sqrt(Math.pow(u,2) + 2*a*xLim)*10)/10;
        d3.select('#dotLineBody0')
            .transition()
            .attr('x2', u*dotScalingFactor);
        d3.select('#arrowHead0')
            .transition()
            .attr('transform', 'translate(' + (u*dotScalingFactor) + ',0)');
        d3.select('#topText0').text(u + 'm/s');

        d3.select('#dotLineBody1')
            .transition()
            .attr('x2', v*dotScalingFactor);
        d3.select('#arrowHead1')
            .transition()
            .attr('transform', 'translate(' + (v*dotScalingFactor) + ',0)');
        d3.select('#topText1').text(v + 'm/s');
    }

    if (bottomType == 'x') {
        d3.select('#bottomText0').text('0m');
        d3.select('#bottomText1').text(xLim + 'm');
    }

    if (bottomType == 't') {
        var t = vars[matchToObject('tLim', vars)].val;
        d3.select('#bottomText0').text('0s');
        d3.select('#bottomText1').text(t + 's');
    }


}