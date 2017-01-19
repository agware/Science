/**
 * Created by war434 on 16/01/2017.
 */

function initFormula (formula, textGap) {

    const fontSize = 50;
    var formulaNum = (formula[0].constructor === Array ? formula.length : 1);

    for (var j = 0; j < formulaNum; j++) {

        var tempFormula = (formulaNum > 1) ? formula[j] : formula;
        var tempGap = (formulaNum > 1) ? textGap[j] : textGap;
        j = j ? j.toString() : '';
        if (!j) {d3.select('#formulaG').datum([tempFormula.length, formulaNum]); }

        for (var i = 0; i < tempFormula.length; i++) {
            var id = '#formulaG' + (i ? (i - 1) + j : '');

            d3.select(id).append('g')
                .attr('transform', 'translate(' + tempGap[i] + ',0)')
                .attr('id', 'formulaG' + i + j)
                .datum(tempGap[i]);

            d3.select('#formulaG' + i).append('text')
                .attr('id', 'formula' + i + j)
                .style('font-size', fontSize + 'px')
                .datum(tempFormula[i]);
        }
    }

    if(!d3.select('#formulaRadioG').selectAll('g').empty()) {
        clickFormula();
    }
}

function updateFormula () {

    var formulaEls = d3.select('#formulaG').datum();
    var formulaCharNum = formulaEls[0];
    var formulaNum = formulaEls[1];

    var activeFormula = formulaNum > 1 ? findActiveFormula() : '';

    for (var i = 0; i < formulaCharNum; i++) {
        var textGap = d3.select('#formulaG' + i + activeFormula).datum();
        d3.select('#formulaG' + i).attr('transform', 'translate(' + textGap + ',0)');
        var formula = d3.select('#formula' + i + activeFormula).datum();
        d3.select('#formula' + i).text(formula);
    }
}

function updateNumbers () {

    var formulaEls = d3.select('#formulaG').datum();
    var formulaCharNum = formulaEls[0];
    var formulaNum = formulaEls[1];

    var activeFormula = formulaNum > 1 ? findActiveFormula() : '';
    var afterEqualsSign = false;

    for (var i = 0; i < formulaCharNum; i++) {
        var temp = d3.select('#formula' + i + activeFormula).datum();

        if (afterEqualsSign) {
            var index = matchToObject(temp, vars);
            if (index >= 0) {
                updateNumber(i, index);
            }
        } else if (temp == '=') {
            afterEqualsSign = true;
        }
    }
}

function updateNumber (i, index) {
    var val = vars[index].val;
    d3.select('#formula' + i).text(val);

    if (val.toString().length > 1) {
        const charGap = 29;
        var containsStop = matchToString('.', val) >= 0;
        var gap = charGap*val.toString().length + (containsStop ? -15 : 0);
        d3.select('#formulaG' + (i+1)).attr('transform', 'translate(' + (gap) + ',0)');
    }
}

function findActiveFormula () {
    var index;

    if (d3.select('#sinRadioBand').classed('active')) {
        index = '';
    } else if (d3.select('#cosRadioBand').classed('active')) {
        index = '1';
    } else {
        index = '2';
    }

    return index;
}