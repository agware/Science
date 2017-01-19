/**
 * Created by war434 on 16/01/2017.
 */

function initDrag(inputs) {

    const r = {'fixed': 8, 'draggable': 15};
    const offset = {'x': r.fixed + 12, 'gap': 30 + 80/inputs.length, 'text': 20, 'arrow': 10, 'shift': 3};
    const scalingFactor = 35;

    for (var i = 0; i < inputs.length; i++) {
        d3.select('#dragG').append('g')
            .attr('transform', 'translate(' + offset.x + ',' + (i*offset.gap) + ')')
            .attr('id', inputs[i].id + 'DragG');

        d3.select('#' + inputs[i].id + 'DragG').append('text')
            .attr('x', -r.fixed)
            .attr('y', -offset.text)
            .attr('id', inputs[i].id + 'DragText')
            .text(inputs[i].name + ' = ' + inputs[i].val + inputs[i].measure);

        var tempLength = inputs[i].val*scalingFactor;
        if (inputs[i].id == 'xLim') {tempLength /= 4; }

        d3.select('#' + inputs[i].id + 'DragG').append('line')
            .attr('x2', tempLength)
            .attr('id', inputs[i].id + 'DragLine');

        d3.select('#' + inputs[i].id + 'DragG').append('g')
            .attr('transform', 'translate(' + (tempLength) + ',0)')
            .attr('id', inputs[i].id + 'DraggableG');

        d3.select('#' + inputs[i].id + 'DraggableG').selectAll('line')
            .data(d3.range(2))
            .enter().append('line')
            .attr('x2', -offset.arrow)
            .attr('y2', function (d) {return (d ? -1 : 1) * offset.arrow; });

        d3.select('#' + inputs[i].id + 'DraggableG').append('circle')
            .attr('cx', -offset.arrow + offset.shift)
            .attr('r', r.draggable)
            .attr('id', inputs[i].id + 'DragBall')
            .classed('clickable', true)
            .style('fill-opacity', 0.4)
            .datum(scalingFactor)
            .call(d3.drag()
                .on('start', dragStart)
                .on('drag', dragUpdate)
                .on('end', dragEnd));

        d3.select('#' + inputs[i].id + 'DragG').append('circle')
            .attr('r', r.fixed)
            .style('fill', '#000');
    }
}

function dragStart() {
    d3.select(this).classed('active', true);
}

function dragUpdate() {
    var lim;
    if (!d3.select('#controlSvg').empty()) {
        lim = {'min': 45, 'max': 160};
    } else {
        lim = {'min': 110, 'max': 230};
    }

    var scalingFactor = d3.select(this).datum();
    var id = d3.select(this).attr('id');
    id = id.substring(0, id.length - 'DragBall'.length);

    var oldOffset = d3.select('#' + id + 'DraggableG').attr('transform');
    oldOffset = parseInt(oldOffset.substring('translate('.length, oldOffset.length - ',0)'.length));

    var tempInput = Math.max(Math.min(d3.event.x + oldOffset, lim.max), lim.min);
    d3.select('#' + id + 'DragLine').attr('x2', tempInput);
    d3.select('#' + id + 'DraggableG').attr('transform', 'translate(' + tempInput + ',0)');

    var index = matchToObject(id, inputs);
    tempInput = Math.floor(tempInput/scalingFactor);
    if (id == 'xLim') {tempInput *= 4}
    inputs[index].val = tempInput;
    d3.select('#' + id + 'DragText').text(inputs[index].name + ' = ' + inputs[index].val + inputs[index].measure);

    updateVars();
}

function dragEnd() {
    d3.select(this).classed('active', false);
}