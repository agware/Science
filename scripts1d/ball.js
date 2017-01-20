/**
 * Created by war434 on 16/01/2017.
 */

function initBall (r) {

    const scalingFactor = 35;

    initCurtain(r);

    d3.select('#ballG').append('circle')
        .attr('r', r)
        .attr('id', 'ball')
        .datum(scalingFactor)
        .transition()
        .duration(500)
        .style('fill-opacity', 1);
}

function resetBall () {
    d3.select('#ball')
        .style('fill-opacity', 0)
        .attr('cx', 0)
        .transition()
        .duration(500)
        .style('fill-opacity', 1);
    animation.mem = 0;

    var tIndex = matchToObject('t', vars);
    if (tIndex >= 0) {vars[tIndex].val = 0; }
    var xIndex = matchToObject('x', vars);
    if (xIndex >= 0) {vars[xIndex].val = 0; }

    if(!d3.select('#formulaRadioG').selectAll('g').empty()) {
        if(d3.select('#numbersRadioBand').classed('active')) {updateNumbers(); }
    }
}

function animateBall () {
    if (animation.state) {
        var scalingFactor = d3.select('#ball').datum();

        var u = vars[matchToObject('u', vars)].val;
        var a = vars[matchToObject('a', vars)].val;
        var xLim = vars[matchToObject('xLim', vars)].val;

        var t = (Date.now() - animation.start) / 1000;
        var tIndex = matchToObject('t', vars);
        if (tIndex >= 0) {vars[tIndex].val = Math.floor(t); }

        // x = ut + (1/2)at^2
        var x = (u * t + (1 / 2) * a * Math.pow(t, 2));
        var xIndex = matchToObject('x', vars);
        if (xIndex >= 0) {vars[xIndex].val = Math.floor(x); }

        // v = u + at
        var v = u + a*t;
        var vIndex = matchToObject('v', vars);
        if (vIndex >= 0) {vars[vIndex].val =  a > 0 ? Math.floor(v) : Math.ceil(v); }

        var loc = x * scalingFactor;
        d3.select('#ball').attr('cx', loc);

        if(!d3.select('#formulaRadioG').selectAll('g').empty()) {
            if(d3.select('#numbersRadioBand').classed('active')) {updateNumbers(); }
        }

        if (loc >= xLim*scalingFactor) {
            if (!d3.select('#pause').empty()) {
                clickPause();
            }
            d3.select('#ball').attr('cx', xLim*scalingFactor);

            setTimeout(function () {
                resetBall(animation);
                animation.start = Date.now();
            }, 500);
        }


    }
}

function initCurtain (r) {
    const curtainNum = 18;

    d3.select('#ballG').append('g')
        .attr('id', 'curtainG')
        .selectAll('circle')
        .data(d3.range(curtainNum)).enter()
        .append('circle')
        .attr('r', r)
        .attr('id', function (d) {return 'curtain' + d; })
        .classed('shadow', true);
}

function updateCurtain () {
    var curtainNum = d3.select('#curtainG').selectAll('circle').size();
    var scalingFactor = d3.select('#ball').datum();
    var u = vars[matchToObject('u', vars)].val;
    var a = vars[matchToObject('a', vars)].val;
    var xLim = vars[matchToObject('xLim', vars)].val;

    for (var i = 0; i < curtainNum; i++) {
        var t = i/2;
        var x = (u*t + (1/2)*a*Math.pow(t, 2));
        var v = u + a*t;
        d3.select('#curtain' + i)
            .transition()
            .duration(750)
            .attr('cx', x*scalingFactor);
        d3.select('#curtain' + i).classed('hidden', x > xLim || v < 0);
    }
}