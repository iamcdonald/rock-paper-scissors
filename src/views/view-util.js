/* global document */
'use strict';

var tempElem = document.createElement('div');

tempElem.id = 'hidden-div';
document.body.appendChild(tempElem);

function getStringAsHTML(view) {
	tempElem.innerHTML = view;
	return tempElem.firstChild;
}

module.exports = {
	getStringAsHTML: getStringAsHTML
};
