/**
 * Created by war434 on 16/01/2017.
 */

function initRadio(g, ids) {

    const radioOffset = {'x': 30, 'button': 50, 'textX': 20, 'textY': 4};
    const radioRadius = 12;

    g.append('g')
        .attr('transform', 'translate(' + radioOffset.x + ',0)')
        .attr('id', 'radio' + ids[0]);

    for (var m = 0; m < ids.length; m++) {

        d3.select('#radio' + ids[0]).append('circle')
            .attr('cy', radioOffset.button * m)
            .attr('r', radioRadius + 5)
            .attr('id', ids[m] + 'RadioBand')
            .style('fill-opacity', 0)
            .classed('active', !m);

        d3.select('#radio' + ids[0]).append('circle')
            .attr('cy', radioOffset.button * m)
            .attr('r', radioRadius)
            .attr('id', ids[m] + 'Radio')
            .classed('clickable', true);

        d3.select('#radio' + ids[0]).append('text')
            .attr('x', radioOffset.textX)
            .attr('y', radioOffset.button * m + radioOffset.textY)
            .text(ids[m]);
    }
}

function initFormulaRadio () {

    const labels = ['formula', 'numbers'];

    initRadio(d3.select('#formulaRadioG'), labels);

    d3.select('#formulaRadio').on('click', clickFormula);
    d3.select('#numbersRadio').on('click', clickNumbers);

}

function initTrigRadio() {

    initRadio(d3.select('#trigRadioG'), ['sin', 'cos', 'tan']);

    d3.select('#sinRadio').on('click', clickSin);
    d3.select('#cosRadio').on('click', clickCos);
    d3.select('#tanRadio').on('click', clickTan);
}

function initDirectionRadio() {

    initRadio(d3.select('#directionRadioG'), ['horizontal', 'vertical']);

    d3.select('#horizontalRadio').on('click', clickHorizontal);
    d3.select('#verticalRadio').on('click', clickVertical);
}

function clickFormula () {
    d3.select('#formulaRadioBand').classed('active',true);
    d3.select('#numbersRadioBand').classed('active', false);

    updateFormula();
}

function clickNumbers () {
    d3.select('#numbersRadioBand').classed('active',true);
    d3.select('#formulaRadioBand').classed('active', false);

    updateNumbers();
}

function clickSin() {
    d3.select('#radiosin').selectAll('circle').classed('active', false);
    d3.select('#sinRadioBand').classed('active', true);

    d3.select('#triangleG').selectAll('text').style('fill', 'rgba(0, 0, 0, 1)');
    d3.select('#textX').style('fill', 'rgba(0, 0, 0, 0)');

    updateFormula();
    if (d3.select('#numbersRadioBand').classed('active')) {
        updateNumbers();
    }
}

function clickCos() {
    d3.select('#radiosin').selectAll('circle').classed('active', false);
    d3.select('#cosRadioBand').classed('active', true);

    d3.select('#triangleG').selectAll('text').style('fill', 'rgba(0, 0, 0, 1)');
    d3.select('#textY').style('fill', 'rgba(0, 0, 0, 0)');

    updateFormula();
    if (d3.select('#numbersRadioBand').classed('active')) {
        updateNumbers();
    }
}

function clickTan() {
    d3.select('#radiosin').selectAll('circle').classed('active', false);
    d3.select('#tanRadioBand').classed('active', true);

    d3.select('#triangleG').selectAll('text').style('fill', 'rgba(0, 0, 0, 1)');
    d3.select('#textVel').style('fill', 'rgba(0, 0, 0, 0)');

    updateFormula();
    if (d3.select('#numbersRadioBand').classed('active')) {
        updateNumbers();
    }
}

function clickHorizontal () {
    d3.select('#horizontalRadioBand').classed('active',true);
    d3.select('#verticalRadioBand').classed('active', false);

    d3.selectAll('.horizontal').classed('hidden', false);
    d3.selectAll('.vertical').classed('hidden', true);

    updateFormula();
    if (d3.select('#numbersRadioBand').classed('active')) {
        updateNumbers();
    }
}

function clickVertical () {
    d3.select('#horizontalRadioBand').classed('active', false);
    d3.select('#verticalRadioBand').classed('active', true);

    d3.selectAll('.horizontal').classed('hidden', true);
    d3.selectAll('.vertical').classed('hidden', false);

    updateFormula();
    if (d3.select('#numbersRadioBand').classed('active')) {
        updateNumbers();
    }
}