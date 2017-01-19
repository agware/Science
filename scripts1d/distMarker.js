/**
 * Created by war434 on 17/01/2017.
 */

function initMarker() {

    const marker = {'arrow': 10, 'distText': 6, 'timeText': 20, 'gap': 10, 'height': 100};

    d3.select('#ballG').append('g')
        .attr('transform', 'translate(0,' + (-marker.height) + ')')
        .attr('id', 'markerG');

    // ArrowHead on left side
    d3.select('#markerG').selectAll('line')
        .data(d3.range(2))
        .enter().append('line')
        .attr('x1', marker.gap)
        .attr('x2', marker.gap + marker.arrow)
        .attr('y2', function(d) {return (d ? -1 : 1) * marker.arrow; });

    // Marker line on left side
    d3.select('#markerG').append('line')
        .attr('y2', marker.height)
        .attr('id', 'markerLine');

    // Arrow line body
    d3.select('#markerG').append('line')
        .attr('x1', marker.gap)
        .attr('id', 'markerLineBody')
        .datum(marker.gap);

    // Text within the marker
    d3.select('#markerG').append('g')
        .attr('id', 'markerTextG');
    d3.select('#markerTextG').append('text')
        .attr('y', -marker.distText)
        .attr('id', 'distText');
    d3.select('#markerTextG').append('text')
        .attr('y', marker.timeText)
        .text('1s');

    // Marker line and arrow head on the right side
    d3.select('#markerG').append('g')
        .attr('id', 'markerRightSection');
    d3.select('#markerRightSection').selectAll('line')
        .data(d3.range(2))
        .enter().append('line')
        .attr('x1', -marker.gap)
        .attr('x2', -marker.gap-marker.arrow)
        .attr('y2', function(d) {return (d ? -1 : 1) * marker.arrow; });
    d3.select('#markerRightSection').append('line')
        .attr('y2', marker.height);

}

function updateMarker() {

    var u = vars[matchToObject('u', vars)].val;
    var gap = d3.select('#markerLineBody').datum();
    var scalingFactor = d3.select('#ball').datum();
    var height = d3.select('#markerLine').attr('y2');
    var t = 2;

    d3.select('#markerG')
        .transition()
        .duration(500)
        .attr('transform', 'translate(' + (u*t*scalingFactor) + ',' + (-height) + ')');

    d3.select('#markerLineBody')
        .transition()
        .duration(500)
        .attr('x2', u*scalingFactor - gap);

    d3.select('#markerTextG')
        .transition()
        .duration(500)
        .attr('transform', 'translate(' + (u*scalingFactor/2 - gap) + ',0)');

    d3.select('#markerRightSection')
        .transition()
        .duration(500)
        .attr('transform', 'translate(' + (u*scalingFactor) + ',0)');

    d3.select('#distText').text(u + 'm');
}