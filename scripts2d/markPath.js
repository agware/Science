/**
 * Created by war434 on 19/01/2017.
 */

function initCurtain (r, textTypes, curtainNum) {

    const arrowOffset = 5;
    const offset = {'topY': 22, 'bottomY': 38, 'x': 15};

    d3.select('#ballG').append('g')
        .attr('id', 'curtainG')
        .datum(textTypes)
        .selectAll('g')
        .data(d3.range(curtainNum)).enter()
        .append('g')
        .attr('id', function (d) {return 'curtainG' + d; });


    for (var i = 0; i < curtainNum; i++) {
        d3.select('#curtainG' + i).append('circle')
            .attr('r', r)
            .attr('id', 'dotG' + i)
            .classed('shadow2', true)
            .classed('clickable', true)
            .on('mouseover', displayText)
            .on('mouseout', exitHover);

        // Horizontal Stuff
        d3.select('#curtainG' + i).append('g')
            .attr('transform', 'translate(0,' + (textTypes.top == 'x' ? r : 0) + ')')
            .attr('id', 'arrowGHorizontal' + i);

        if (textTypes.top == 'x') {
            d3.select('#arrowGHorizontal' + i).append('g')
                .attr('id', 'horizontalFixedArrowHead' + i);

            d3.select('#horizontalFixedArrowHead' + i).selectAll('line')
                .data(d3.range(2))
                .enter().append('line')
                .attr('x2', -arrowOffset)
                .attr('y2', function (d) {return (d ? -1 : 1) * arrowOffset; });
        }

        d3.select('#arrowGHorizontal' + i).append('line')
            .attr('id', 'horizontalLineCurtain' + i);

        d3.select('#arrowGHorizontal' + i).append('g')
            .attr('id', 'horizontalArrowHead' + i);

        d3.select('#horizontalArrowHead' + i).selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', -arrowOffset)
            .attr('y2', function (d) {return (d ? -1 : 1) * arrowOffset; });


        // Vertical Stuff
        d3.select('#curtainG' + i).append('g')
            .attr('transform', 'translate(0,' + (textTypes.top == 'x' ? r : 0) + ')')
            .attr('id', 'arrowGVertical' + i);

        if (textTypes.top == 'x') {
            d3.select('#arrowGVertical' + i).append('g')
                .attr('id', 'verticalFixedArrowHead' + i);

            d3.select('#verticalFixedArrowHead' + i).selectAll('line')
                .data(d3.range(2))
                .enter().append('line')
                .attr('x2', function (d) {return (d ? -1 : 1) * arrowOffset; })
                .attr('y2', -arrowOffset);
        }

        d3.select('#arrowGVertical' + i).append('line')
            .attr('id', 'verticalLineCurtain' + i);

        d3.select('#arrowGVertical' + i).append('g')
            .attr('id', 'verticalArrowHead' + i);

        d3.select('#verticalArrowHead' + i)
            .selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', function (d) {return (d ? -1 : 1) * arrowOffset; })
            .attr('y2', arrowOffset);

        if (textTypes.top != 'x') {
            d3.select('#arrowGHorizontal' + i).classed('horizontal', true);
            d3.select('#horizontalArrowHead' + i).classed('horizontal', true);

            d3.select('#arrowGVertical' + i).classed('vertical', true);
            d3.select('#verticalArrowHead' + i).classed('vertical', true);
        }


        // Text
        d3.select('#curtainG' + i).append('g')
            .attr('transform', 'translate(' + (-12) + ',0)')
            .attr('id', 'textG' + i);

        d3.select('#textG'+ i).append('text')
            .attr('y', -offset.topY)
            .attr('id', 'topTextHorizontal' + i);

        d3.select('#textG'+ i).append('text')
            .attr('y', offset.bottomY)
            .attr('id', 'bottomTextHorizontal' + i);

        d3.select('#textG'+ i).append('text')
            .attr('y', -offset.topY)
            .attr('id', 'topTextVertical' + i);

        d3.select('#textG'+ i).append('text')
            .attr('y', offset.bottomY)
            .attr('id', 'bottomTextVertical' + i);
    }

    d3.select('#curtainG').selectAll('text').classed('hidden', true);
    if (textTypes.top == 'x') {
        d3.select('#curtainG').selectAll('line').classed('hidden', true);
    }
}

function updateCurtain () {
    var numDots = d3.select('#curtainG').selectAll('circle').size();
    if (numDots > 2) {
        updateSpacedDots(numDots);
    } else {
        updateLimDots(numDots);
    }
}

function updateSpacedDots (numDots) {
    var u = vars[matchToObject('u', vars)].val;
    var a = vars[matchToObject('a', vars)].val;

    var scalingFactor = d3.select('#ball').datum();
    var arrowScalingFactor = scalingFactor/4;
    var types = d3.select('#curtainG').datum();

    for (var i = 0; i < numDots; i++) {
        var t = (i+1)/2;
        var x = [0,0];
        var v = [0,0];
        for (var j = 0; j < x.length; j++) {
            // x = u*t + (1/2)*a*t^2
            x[j] = u[j]*t + (1/2)*a[j]*Math.pow(t,2);

            // v = u + at
            v[j] = u[j] + a[j]*t;
        }

        d3.select('#curtainG' + i).attr('transform', 'translate(' + x[0]*scalingFactor + ',' + (-x[1]*scalingFactor) + ')');

        // Update dots + arrows

        if (types.top == 'v') {
            d3.select('#topTextHorizontal'+ i).text(v[0] + 'm/s');
            d3.select('#topTextVertical'+ i)
                .attr('x', v[1] > 3 ? 15 : 0)
                .text(Math.round(v[1]*10)/10 + 'm/s');

            d3.select('#bottomTextVertical'+ i)
                .attr('x', v[1] < -3 ? 15 : 0);

            d3.select('#horizontalLineCurtain' + i).attr('x2', v[0]*arrowScalingFactor);
            d3.select('#horizontalArrowHead' + i)
                .attr('transform', 'translate(' + v[0]*arrowScalingFactor + ',0)')
                .classed('hidden', -0.1 < v[0] && v[0] < 0.1);

            var rotate = v[1] > 0 ? 0 : 180;
            d3.select('#verticalLineCurtain' + i).attr('y2', -v[1]*arrowScalingFactor);

            d3.select('#verticalArrowHead' + i)
                .attr('transform', 'translate(0,' + (-v[1]*arrowScalingFactor) + ')rotate(' + rotate + ')')
                .classed('hidden', -0.2 < v[1] && v[1] < 0.2);

        } else if (types.top == 'x') {
            d3.select('#topTextHorizontal'+ i).text(Math.round(x[0]*10)/10 + 'm');
            d3.select('#topTextVertical'+ i)
                .attr('x', x[1] < 0 ? 15 : 0)
                .text(Math.round(x[1]*10)/10 + 'm');

            d3.select('#bottomTextVertical'+ i)
                .attr('x', x[1] > 2 ? 15 : 0);

            d3.select('#horizontalLineCurtain' + i).attr('x2', -x[0]*scalingFactor);
            d3.select('#horizontalArrowHead' + i)
                .attr('transform', 'translate(' + (-x[0]*scalingFactor) + ',0)rotate(180)');

            var rotate = x[1] > 0 ? 180 : 0;
            d3.select('#verticalLineCurtain' + i).attr('y2', x[1]*scalingFactor);
            d3.select('#verticalArrowHead' + i)
                .attr('transform', 'translate(0,' + (x[1]*scalingFactor) + ')rotate(' + rotate + ')');
            d3.select('#verticalFixedArrowHead' + i).attr('transform', 'rotate(' + rotate + ')');
        }

        if (types.bottom == 't') {
            d3.select('#bottomTextHorizontal'+ i).text(Math.round(t*100)/100 + 's');
            d3.select('#bottomTextVertical'+ i)
                .text(Math.round(t*100)/100 + 's');
        }
    }
}

function updateLimDots (numDots) {

    var u = vars[matchToObject('u', vars)].val;
    var a = vars[matchToObject('a', vars)].val;
    var xLim = vars[matchToObject('xLim', vars)].val;
    var tLim = vars[matchToObject('tLim', vars)].val;
    var vLim = [u[0]+a[0]*tLim[0], u[1]+a[1]*tLim[1]];

    var scalingFactor = d3.select('#ball').datum();
    var arrowScalingFactor = scalingFactor/4;
    var types = d3.select('#curtainG').datum();

    d3.select('#curtainG0').attr('transform', 'translate(' + xLim[0]*scalingFactor + ',' + (-xLim[1]*scalingFactor) + ')');

    if (types.top == 'v') {
        d3.select('#topTextHorizontal0').text(vLim[0] + 'm/s');
        d3.select('#topTextVertical0')
            .attr('x', vLim[1] > 3 ? 15 : 0)
            .text(Math.round(vLim[1] * 10) / 10 + 'm/s');

        d3.select('#bottomTextVertical0')
            .attr('x', vLim[1] < -3 ? 15 : 0);

        d3.select('#horizontalLineCurtain0').attr('x2', vLim[0] * arrowScalingFactor);
        d3.select('#horizontalArrowHead0')
            .attr('transform', 'translate(' + vLim[0] * arrowScalingFactor + ',0)')
            .classed('hidden', -0.1 < vLim[0] && vLim[0] < 0.1);

        var rotate = vLim[1] > 0 ? 0 : 180;
        d3.select('#verticalLineCurtain0').attr('y2', -vLim[1] * arrowScalingFactor);

        d3.select('#verticalArrowHead0')
            .attr('transform', 'translate(0,' + (-vLim[1] * arrowScalingFactor) + ')rotate(' + rotate + ')')
            .classed('hidden', -0.2 < vLim[1] && vLim[1] < 0.2);
    }

    if (types.bottom == 't') {
        d3.select('#bottomTextHorizontal0').text(Math.round(tLim[0]*100)/100 + 's');
        d3.select('#bottomTextVertical0')
            .text(Math.round(tLim[0]*100)/100 + 's');
    }
}

function displayText () {
    d3.select(this).classed('active', true);

    var id = d3.select(this).attr('id');
    id = id.substring('dotG'.length, id.length);

    var direction = d3.select('#horizontalRadioBand').classed('active') ? 'Horizontal' : 'Vertical';

    d3.select('#topText' + direction + id).classed('hidden', false);
    d3.select('#bottomText' + direction + id).classed('hidden', false);

    var types = d3.select('#curtainG').datum();
    if (types.top == 'x') {
        d3.select('#arrowG' + direction + id).selectAll('line').classed('hidden', false);
    }
}

function exitHover () {
    d3.select(this).classed('active', false);
    d3.select('#curtainG').selectAll('text').classed('hidden', true);

    var types = d3.select('#curtainG').datum();
    if (types.top == 'x') {
        d3.select('#curtainG').selectAll('line').classed('hidden', true);
    }
}