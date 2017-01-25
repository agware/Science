/**
 * Created by war434 on 16/01/2017.
 */

function generateHeader() {

    d3.select('#header').append('svg')
        .attr('height', 90)
        .attr('width', 600)
        .attr('id', 'headerSvg');

    d3.select('#headerSvg').append('text')
        .attr('x', 240)
        .attr('y', 45)
        .text('Motion')
        .style('font-size', '40px');


    // Home
    d3.select('#headerSvg').append('g')
        .attr('transform', 'translate(' + 180 + ',' + 82 + ')')
        .attr('id', 'homeG');

    d3.select('#homeG').append('text')
        .text('home')
        .style('font-size', '20px');

    d3.select('#homeG').append('a')
        .attr('xlink:href', 'https://agware.github.io/display/home/')
        .append('rect')
        .attr('height', 26)
        .attr('width', 90)
        .attr('x', -18)
        .attr('y', -20)
        .style('fill', '#000000')
        .style('fill-opacity', 0.2);


    // About
    d3.select('#headerSvg').append('g')
        .attr('transform', 'translate(' + 280 + ',' + 82 + ')')
        .attr('id', 'aboutG');

    d3.select('#aboutG').append('text')
        .text('about')
        .style('font-size', '20px');

    d3.select('#aboutG').append('a')
        .attr('xlink:href', 'https://agware.github.io/display/about/')
        .append('rect')
        .attr('height', 26)
        .attr('width', 90)
        .attr('x', -16)
        .attr('y', -20)
        .style('fill', '#000000')
        .style('fill-opacity', 0.2);


    // Contact
    d3.select('#headerSvg').append('g')
        .attr('transform', 'translate(' + 376 + ',' + 82 + ')')
        .attr('id', 'contactG');

    d3.select('#contactG').append('text')
        .text('contact')
        .style('font-size', '20px');

    d3.select('#contactG').append('a')
        .attr('xlink:href', 'https://agware.github.io/display/contact/')
        .append('rect')
        .attr('height', 26)
        .attr('width', 90)
        .attr('x', -10)
        .attr('y', -20)
        .style('fill', '#000000')
        .style('fill-opacity', 0.2);
}

function generateFooter () {

    var year = new Date().getFullYear();
    var text = '© Copyright ' + year + ' CSIRO Australia.';

    d3.select('#footer').append('svg')
        .attr('height', 17)
        .attr('width', 600)
        .attr('id', 'footerSvg');

    d3.select('#footerSvg').append('text')
        .attr('x', 210)
        .attr('y', 14)
        .text(text)
        .style('font-size', '11px');
}


function matchToObject (id, object) {
    var index = -1;
    for (var i = 0; i < object.length; i++) {
        if (id == object[i].id) {
            index = i;
            break;
        }
    }
    return index;
}

function matchToString(id, string) {
    var index = -1;
    string = string.toString();
    for (var i = 0; i < string.length; i++) {
        if (id == string.charAt(i)) {
            index = i;
            break;
        }
    }
    return index;
}