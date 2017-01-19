/**
 * Created by war434 on 9/01/2017.
 */

function initButtons() {

    const button = [{'id': 'play', 'x': 35, 'func': clickPlay},
                    {'id': 'pause', 'x': 85, 'func': clickPause},
                    {'id': 'reset', 'x': 135, 'func': clickReset}];

    const dim = {'size': 30, 'rx': 5};
    const offset = {'y': 20};

    d3.select('#controlSvg').append('g').selectAll('g')
        .data(button).enter()
        .append('g')
        .attr('transform', function(d) {return 'translate(' + d.x + ',' + offset.y + ')'; })
        .attr('id', function(d) {return d.id + 'G'; });

    for (var i = 0; i < button.length; i++) {
        d3.select('#' + button[i].id + 'G')
            .on('click', button[i].func)
            .classed('clickable', true)
            .append('rect')
            .attr('height', dim.size)
            .attr('width', dim.size)
            .attr('rx', dim.rx)
            .attr('id', button[i].id)
            .classed('clickable', true);

        drawSymbols(button[i].id, dim);

        animation.state ? clickPlay() : clickPause();
    }
}

function drawSymbols(id, dim) {
    const offset = {'line': 8, 'arrow': 4};
    const resetRadius = 8;

    // Init symbols
    switch (id) {
        case 'play':
            d3.select('#playG').append('path')
                .attr('d', 'M ' + offset.line + ' ' + offset.line + ' L ' + offset.line + ' ' + (dim.size - offset.line) + ' L ' + (dim.size - offset.line) + ' ' + (dim.size / 2) + ' Z')
                .style('fill', '#fff');
            break;

        case 'pause':
            d3.select('#pauseG').selectAll('line')
                .data(d3.range(2))
                .enter().append('line')
                .attr('x1', function (d) {
                    return (d + 1) * (dim.size / 3);
                })
                .attr('y1', offset.line)
                .attr('x2', function (d) {
                    return (d + 1) * (dim.size / 3);
                })
                .attr('y2', dim.size - offset.line)
                .style('stroke', '#fff')
                .style('stroke-width', (dim.size / 6) + 'px');
            break;

        case 'reset':
            d3.select('#resetG').append('g')
                .attr('id', 'resetSymbol');
            d3.select('#resetSymbol').append('clipPath')
                .attr('id', 'clipReset')
                .append('path')
                .attr('d', 'M ' + 0 + ' ' + 0 + ' L ' + dim.size / 2 + ' ' + 0 + ' L ' + dim.size / 2 + ' ' + dim.size / 3 +
                    ' L ' + dim.size + ' ' + dim.size / 3 + ' L ' + dim.size + ' ' + dim.size + ' L ' + 0 + ' ' + dim.size + ' Z')
                .attr('id', 'clipPathReset');
            d3.select('#resetSymbol').append('circle')
                .attr('cx', dim.size / 2)
                .attr('cy', dim.size / 2)
                .attr('r', resetRadius)
                .attr('clip-path', 'url(#clipReset)')
                .style('fill-opacity', 0)
                .style('stroke-opacity', 1)
                .style('stroke', '#fff')
                .style('stroke-width', '2px');
            d3.select('#resetSymbol').append('g')
                .attr('transform', 'translate(' + dim.size / 2 + ',' + (dim.size / 2 - resetRadius + 1) + ')')
                .attr('id', 'resetArrowHead');
            d3.select('#resetArrowHead').selectAll('line')
                .data(d3.range(2))
                .enter().append('line')
                .attr('x2', -offset.arrow)
                .attr('y2', function (d) {
                    return (d ? -1 : 1) * offset.arrow;
                })
                .style('stroke', '#fff')
                .style('stroke-width', '2px');
            break;
    }
}

function clickPlay() {
    d3.select('#play').classed('active', true);
    d3.select('#pause').classed('active', false);

    animation.start = animation.state ?  animation.start : (Date.now() - animation.mem);
    animation.state = true;
}

function clickPause() {
    d3.select('#play').classed('active', false);
    d3.select('#pause').classed('active', true);

    if (animation.state) {
        animation.mem = Date.now() - animation.start;
        animation.state = false;
    }
}

function clickReset() {
    d3.select('#reset').classed('active', true);
    setTimeout(function() {d3.select('#reset').classed('active', false); }, 200);
    clickPause(animation);
    resetBall(animation);
}