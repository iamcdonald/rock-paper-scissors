/* global document */
'use strict';

var viewUtil = require('./view-util'),
	gameViewTemplate = require('./GameViewTemplate'),
	PlayerView = require('./PlayerView'),
	gameItems = require('../game/game-items'),
	gameListElem = document.getElementById('game-list'),
	id = 0,
	OUTCOMES = {
		DRAW: {
			klass: 'is-draw',
			msg: 'I\'m afraid it\'s a tie old chap.'
		},
		WIN: {
			klass: 'is-win',
			msg: 'Whato, jolly good show. You\'ve won. I\'ll fetch the champagne.'
		},
		LOSE: {
			klass: 'is-loss',
			msg: 'Looks like a spot of bad luck old bean. Better luck next time.'
		}
	};

function setOutcome(view, outcome) {
	var outcomeElem = view.getElementsByClassName('outcome')[0];
	outcomeElem.className += ' is-visible ' + outcome.klass;
	outcomeElem.innerHTML = outcome.msg;
	view.className += ' game-finished';
}

function render(gView) {
	var gameView = gameViewTemplate.replace(/{{id}}/, 'game-' + id++),
		outcomeView;
	gView.view = viewUtil.getStringAsHTML(gameView); 
	gView.view.appendChild(gView.player1View.view);
	gView.view.appendChild(gView.player2View.view);	
	gView.view = gameListElem.insertBefore(gView.view, gameListElem.firstChild);
	
	setTimeout(function () {
		gView.view.className += ' is-visible';
	}, 500);
}

function GameView(game) {
	var self = this;
	self.game = game;
	self.player1View = new PlayerView(this.game.p1);
	self.player2View = new PlayerView(this.game.p2);
	self.game.winner.then(function (val) {	
		var outcome = !val ? OUTCOMES.DRAW : self.game.p1 === val ? OUTCOMES.WIN : OUTCOMES.LOSE;
		setOutcome(self.view, outcome);
	});
	render(self);
}

module.exports = GameView;
