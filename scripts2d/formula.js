/**
 * Created by war434 on 18/01/2017.
 */

function initFormula (formula, textGap) {

    const fontSize = 50;

    for (var i = 0; i < formula.length; i++) {
        var id = '#formulaG' + (i ? (i - 1) : '');

        d3.select(id).append('g')
            .attr('transform', 'translate(' + textGap[i] + ',0)')
            .attr('id', 'formulaG' + i)
            .datum(textGap[i]);

        d3.select('#formulaG' + i).append('text')
            .attr('id', 'formula' + i)
            .style('font-size', fontSize + 'px')
            .datum(formula[i]);
    }

    if(!d3.select('#formulaRadioG').selectAll('g').empty()) {
        clickFormula();
    }
}

function updateFormula () {

    var formulaEls = d3.select('#formulaG').selectAll('g').size();

    for (var i = 0; i < formulaEls; i++) {
        var textGap = d3.select('#formulaG' + i).datum();
        d3.select('#formulaG' + i).attr('transform', 'translate(' + textGap + ',0)');
        var formula = d3.select('#formula' + i).datum();
        d3.select('#formula' + i).text(formula);
    }
}

function updateNumbers () {

    var formulaEls = d3.select('#formulaG').selectAll('g').size();
    var afterEqualsSign = false;

    for (var i = 0; i < formulaEls; i++) {
        var temp = d3.select('#formula' + i).datum();
        if (afterEqualsSign) {
            var index = matchToObject(temp, vars);
            if (index >= 0) {
                updateNumber(i, index, formulaEls);
            }
        } else if (temp == '=') {
            afterEqualsSign = true;
        }
    }
}

function updateNumber (i, index, numEls) {
    var directionIndex = d3.select('#horizontalRadioBand').classed('active') ? 0 : 1;
    var val = vars[index].val[directionIndex];

    if (val < 0) {val = '(' + val + ')'; }
    d3.select('#formula' + i).text(val);

    if (i != (numEls-1)) {
        var gap = getGap(val.toString(), i);
        d3.select('#formulaG' + (i+1)).attr('transform', 'translate(' + (gap) + ',0)');
    }

}

function getGap (string, i) {
    var gap = d3.select('#formulaG'+ (i+1)).datum();

    if (string.length > 1) {
        gap = 29*string.length;
        gap -= (matchToString('.', string) >= 0) ? 15 : 0;
        gap -= (matchToString('(', string) >= 0) ? 40 : 0;
    }

    return gap;
}