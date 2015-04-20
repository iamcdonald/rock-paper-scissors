'use strict';

var Game = require('./Game'),
	players = require('../players');

function HumanVsCompGame() {
	Game.call(this, new players.Human('You'), new players.Computer());
	this.p2.setSelection();
}

HumanVsCompGame.prototype = Object.create(Game.prototype);

module.exports = HumanVsCompGame;
