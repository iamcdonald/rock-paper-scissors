'use strict';

var Player = require('./Player');

function Human(title) {
	Player.call(this, title);
	this.type = 'human';
}

Human.prototype = Object.create(Player.prototype);

module.exports = Human;
