/**
 * Created by war434 on 18/01/2017.
 */

function initInputsDrag () {

    for (var i = 0; i < inputs.length; i++) {

        const r = {'fixed': 8, 'draggable': 15};
        const offset = {'x': 20, 'gap': 130, 'text': 50, 'arrow': 5, 'shift': 3};
        const underline = {'x': 25, 'y': 10, 'len': 75};
        const scalingFactor = 4;

        d3.select('#inputsDragG')
            .datum(scalingFactor)
            .append('g')
            .attr('transform',  'translate(' + offset.x + ',' + (i*offset.gap) + ')')
            .attr('id', inputs[i].id + 'G');

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

            d3.select('#' + inputs[i].id + 'HorizontalDraggableG').selectAll('line')
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
            const verticalOffset = {'x': 120, 'y': 80, 'shift': -50, 'text': 20};
            var lineLen = -inputs[i].val[1]*scalingFactor;
            var negArrow = lineLen > 0 ? 1 : 0;

            d3.select('#' + inputs[i].id + 'G').append('g')
                .attr('transform', 'translate(' + verticalOffset.x + ',' + (verticalOffset.y + verticalOffset.shift*negArrow) + ')')
                .attr('id', inputs[i].id + 'VerticalG');

            d3.select('#' + inputs[i].id + 'VerticalG').append('text')
                .attr('x', -verticalOffset.text)
                .attr('y', verticalOffset.text*(negArrow ? -0.2 : 1))
                .attr('id', inputs[i].id + 'VerticalText')
                .text(inputs[i].val[1] + inputs[i].measure);

            d3.select('#' + inputs[i].id + 'VerticalG').append('line')
                .attr('y2', lineLen)
                .attr('id', inputs[i].id + 'VerticalLine');

            d3.select('#' + inputs[i].id + 'VerticalG').append('g')
                .attr('transform', 'translate(0,' + (lineLen) + ')')
                .attr('id', inputs[i].id + 'VerticalDraggableG');

            d3.select('#' + inputs[i].id + 'VerticalDraggableG').selectAll('line')
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
    const lim = {'min': 0, 'max': 50};

    var id = d3.select(this).attr('id');
    id = id.substring(0, id.length - 'HorizontalDragBall'.length);

    var oldOffset = d3.select('#' + id + 'HorizontalDraggableG').attr('transform');
    oldOffset = parseInt(oldOffset.substring('translate('.length, oldOffset.length - ',0)'.length));

    var tempInput = Math.max(Math.min(d3.event.x + oldOffset, lim.max), lim.min);

    dragUpdate(0, id, tempInput);
}

function dragVerticalUpdate () {
    const lim = {'min': 0, 'max': 80};

    var id = d3.select(this).attr('id');
    id = id.substring(0, id.length - 'VerticalDragBall'.length);

    var oldOffset = d3.select('#' + id + 'VerticalDraggableG').attr('transform');
    oldOffset = parseInt(oldOffset.substring('translate(0,'.length, oldOffset.length - ')'.length));

    var tempInput = Math.max(Math.min(-(d3.event.y + oldOffset), lim.max), lim.min);

    dragUpdate(1, id, tempInput);
}

function dragUpdate(direction, id, input) {
    var directionName = direction ? 'Vertical' : 'Horizontal';

    var attrSelect = direction ? 'y2' : 'x2';
    d3.select('#' + id + directionName + 'Line').attr(attrSelect, input*(direction ? -1 : 1));
    var transform = direction ? 'translate(0,' + (-input) + ')' : 'translate(' + (input) + ',0)';
    d3.select('#' + id + directionName + 'DraggableG').attr('transform', transform);

    var scalingFactor = d3.select('#inputsDragG').datum();
    input = Math.floor(input/scalingFactor);

    var index = matchToObject(id, inputs);
    inputs[index].val[direction] = input;
    d3.select('#' + id + directionName + 'Text').text(input + inputs[index].measure);

    updateVars();
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

