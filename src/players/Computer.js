'use strict';

var Player = require('./Player'),
	itemsArray = require('../game/game-items').itemsArray;

function Computer() {
	Player.call(this, 'Computer');
	this.type = 'computer';
}

Computer.prototype = Object.create(Player.prototype);

Computer.prototype.setSelection = function () {
	Player.prototype.setSelection.call(this, itemsArray[Math.floor(Math.random() * itemsArray.length)]);
};

module.exports = Computer;
