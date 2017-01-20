/**
 * Created by war434 on 18/01/2017.
 */

function initBall (r) {

    const scalingFactor = 30;

    d3.select('#ballG').append('circle')
        .attr('r', r)
        .classed('shadow2', true);

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
        .attr('cx', 0)
        .attr('cy', 0)
        .style('fill-opacity', 0)
        .transition()
        .duration(500)
        .style('fill-opacity', 1);
    animation.mem = 0;

    var tIndex = matchToObject('t', vars);
    if (tIndex >= 0) {vars[tIndex].val = [0,0]; }
    var xIndex = matchToObject('x', vars);
    if (xIndex >= 0) {vars[xIndex].val = [0,0]; }

    if(!d3.select('#formulaRadioG').selectAll('g').empty()) {
        if(d3.select('#numbersRadioBand').classed('active')) {updateNumbers(); }
    }
}

function updateBall () {

    var scalingFactor = d3.select('#ball').datum();
    var x0 = vars[matchToObject('x0', vars)].val;
    var r = d3.select('#ball').attr('r');

    d3.select('#ballG').attr('transform', 'translate(' + (x0[0]*scalingFactor) + ',' + (-x0[1]*scalingFactor - r) + ')');

    d3.select('#heightLine').attr('y2', -x0[1]*scalingFactor);
    d3.select('#heightText')
        .attr('y', -x0[1]*scalingFactor/2)
        .text(Math.floor(x0[1]*10)/10 + 'm');

}

function animateBall () {
    if (animation.state) {
        var scalingFactor = d3.select('#ball').datum();

        var u = vars[matchToObject('u', vars)].val;
        var a = vars[matchToObject('a', vars)].val;
        var xLim = vars[matchToObject('xLim', vars)].val;

        var tempT = (Date.now() - animation.start) / 1000;
        var t = [tempT, tempT];

        var x = [0,0];
        var v = [0,0];
        var loc = [0,0];

        var tIndex = matchToObject('t', vars);
        var xIndex = matchToObject('x', vars);
        var vIndex = matchToObject('v', vars);
        var tLimIndex = matchToObject('tLim', vars);

        for (var i = 0; i < u.length; i++) {

            if (tIndex >= 0) {vars[tIndex].val[i] = Math.round(t[i] * 10) / 10; }

            // x = ut + (1/2)at^2
            x[i] = (u[i] * t[i] + (1 / 2) * a[i] * Math.pow(t[i], 2));
            if (xIndex >= 0) {vars[xIndex].val[i] = Math.round(x[i] * 10)/ 10; }

            // v = u + at
            v[i] = u[i] + a[i] * t[i];
            if (vIndex >= 0) {vars[vIndex].val[i] = Math.round(v[i]); }

            loc[i] = x[i] * scalingFactor;

        }

        d3.select('#ball')
            .attr('cx', loc[0])
            .attr('cy', -loc[1]);



        var limHit = false;
        if (tLimIndex >= 0) {
            limHit = tempT >= vars[tLimIndex].val[0];
        } else {
            limHit = loc[0] > xLim[0]*scalingFactor || loc[1] < xLim[1]*scalingFactor;
        }

        if (limHit) {
            if (!d3.select('#pause').empty()) {
                clickPause();
            }

            d3.select('#ball')
                .attr('cx', xLim[0]*scalingFactor)
                .attr('cy', -xLim[1]*scalingFactor);

            setTimeout(function () {
                resetBall(animation);
                animation.start = Date.now();
            }, 500);
        }

        if(!d3.select('#formulaRadioG').selectAll('g').empty()) {
            if(d3.select('#numbersRadioBand').classed('active')) {
                updateNumbers(); }
        }

    }
}