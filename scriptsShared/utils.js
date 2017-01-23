/**
 * Created by war434 on 16/01/2017.
 */

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

function navigateHome() {
    //window.location = 'https://agware.github.io/display/index/';
}