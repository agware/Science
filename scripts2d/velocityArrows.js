/**
 * Created by war434 on 19/01/2017.
 */

function initVelocityArrows () {

    const offset = {'arrow': 10};

    initHorizontalArrow();
    initVerticalArrow();
    initVelocityArrow();

    function initHorizontalArrow () {
        d3.select('#ballG').append('line')
            .attr('id', 'horizontalDotLine')
            .classed('split', true)
            .classed('splitLine', true);

        d3.select('#ballG').append('line')
            .attr('id', 'horizontalLine')
            .classed('greyArrow', true)
            .classed('horizontal', true);

        d3.select('#ballG').append('g')
            .attr('id', 'horizontalArrowHead');

        d3.select('#horizontalArrowHead').selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', -offset.arrow)
            .attr('y2', function (d) {return (d ? -1 : 1) * offset.arrow; })
            .classed('greyArrow', true)
            .classed('horizontal', true);
    }

    function initVerticalArrow () {
        d3.select('#ballG').append('g')
            .attr('id', 'shiftRightG');

        d3.select('#shiftRightG').append('line')
            .attr('id', 'verticalDotLine')
            .classed('split', true)
            .classed('splitLine', true);

        d3.select('#shiftRightG').append('line')
            .attr('id', 'verticalLine')
            .classed('greyArrow', true)
            .classed('vertical', true);

        d3.select('#shiftRightG').append('g')
            .attr('id', 'verticalArrowHead');

        d3.select('#verticalArrowHead').selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', function (d) {return (d ? -1 : 1) * offset.arrow; })
            .attr('y2', offset.arrow)
            .classed('greyArrow', true)
            .classed('vertical', true);
    }

    function initVelocityArrow () {
        d3.select('#ballG').append('g')
            .attr('id', 'velocityArrowG');

        d3.select('#velocityArrowG').append('line')
            .attr('id', 'velocityLine');

        d3.select('#velocityArrowG').append('g')
            .attr('id', 'velocityArrowHead');

        d3.select('#velocityArrowHead').selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', -offset.arrow)
            .attr('y2', function (d) {return (d ? -1 : 1) * offset.arrow; });

        d3.select('#ballG').append('circle')
            .attr('r', 3)
            .style('fill', '#000');
    }


}

function updateVelocityArrows () {
    var u = vars[matchToObject('u', vars)].val;
    var x = u[0] ? u[0] : 0.001;
    var y = u[1];
    var angle = Math.atan(y/x)*180/Math.PI;
    var vel = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));

    var scalingFactor = d3.select('#ball').datum()/4;

    d3.select('#velocityArrowG').attr('transform', 'rotate(' + (-angle) + ')');
    d3.select('#velocityLine').attr('x2', vel*scalingFactor);
    d3.select('#velocityArrowHead')
        .attr('transform', 'translate(' + vel*scalingFactor + ',0)')
        .classed('hidden', vel < 0.5);

    d3.select('#horizontalDotLine').attr('x2', u[0]*scalingFactor);
    d3.select('#horizontalLine').attr('x2', u[0]*scalingFactor);
    d3.select('#horizontalArrowHead')
        .attr('transform', 'translate(' + u[0]*scalingFactor + ',0)')
        .classed('hidden', u[0]==0);


    d3.select('#shiftRightG').attr('transform', 'translate(' + u[0]*scalingFactor + ',0)');

    d3.select('#verticalDotLine').attr('y2', -u[1]*scalingFactor);
    d3.select('#verticalLine').attr('y2', -u[1]*scalingFactor);
    d3.select('#verticalArrowHead')
        .attr('transform', 'translate(0,' + (-u[1]*scalingFactor) + ')')
        .classed('hidden', u[1]==0);
}