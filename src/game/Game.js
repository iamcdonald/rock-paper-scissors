'use strict';

var Future = require('../Future');

function getWinner(p1, p2) {
	var p1Sel = p1.getSelection(),
		p2Sel = p2.getSelection();

	if (!p1Sel || !p2Sel || p1Sel.equals(p2Sel)) {
		return null;
	}
	return  (p1Sel.beats(p2Sel) ? p1 : p2);
}

function Game(player1, player2) {
	var self = this;
	self.p1 = player1;
	self.p2 = player2;
	self._winner = new Future();
	self.winner = self._winner.lock();
	Future.all([self.p1.selected, self.p2.selected]).then(function () {
		self._winner.resolve(getWinner(self.p1, self.p2));
	});
}

module.exports = Game;

