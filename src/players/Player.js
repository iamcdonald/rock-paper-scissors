var Future = require('../Future');

function Player (title) {
	this.title = title || '';
	this._selection = new Future();
	this.selected = this._selection.lock();
}

Player.prototype = {
	setSelection: function (val) {
		this._selection.resolve(val);
	},
	getSelection: function () {
		return this.selected.getVal();
	}
};

module.exports = Player;
