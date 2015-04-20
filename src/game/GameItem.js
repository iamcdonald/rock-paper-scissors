'use strict';

function GameItem(title, lesser) {
	this.title = title;
	this.id = title.toUpperCase();
	this._lesser = lesser || [];
}

GameItem.prototype = {
	beats: function (item) {
		return this._lesser.indexOf(item.title) >= 0; 
	},
	equals: function (item) {
		return this.id === item.id;
	}
};

module.exports = GameItem;
