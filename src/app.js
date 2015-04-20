'use strict';

var GameView = require('./views/GameView'),
	HVCGame = require('./game/HumanVsCompGame'),
	players = require('./players');

function newGame() {
	var game = new HVCGame();
	game.winner.then(newGame);
	new GameView(game);
}

newGame();
