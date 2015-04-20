'use strict';

var viewUtil = require('./view-util'),
	gameItems = require('../game/game-items'),
	playerViewTemplate = require('./PlayerViewTemplate'),
	itemViewTemplate = require('./ItemView');

function render(pView) {
	var playerTemplate = playerViewTemplate.replace(/{{type}}/, pView.player.type);
	playerTemplate = playerTemplate.replace(/{{title}}/, pView.player.title);
	playerTemplate = playerTemplate.replace(/{{content}}/, itemViewTemplate);

	pView.view = viewUtil.getStringAsHTML(playerTemplate);
	if (pView.player.type === 'human') {
		pView.view.addEventListener('click', pView.itemSelected);
	}

}

function PlayerView(player) {
	var self = this;
	self.player = player;
	self.itemSelected = function(ev) {
		var elem = ev.target,
			code = elem.getAttribute('data-id');
		if (code) {
			self.player.setSelection(gameItems.ITEMS[code]);
		}
	};

	render(self);
	
	self.player.selected.then(function (val) {
		self.view.className += ' has-chosen';
		var childNodes = self.view.childNodes;
		for(var i = 0, l = childNodes.length; i < l; i++) {
			if (childNodes[i].nodeType === 1 && childNodes[i].getAttribute('data-id') === val.id) {
				childNodes[i].className += ' is-selected';
				break;
			}
		}	
	});
}

module.exports = PlayerView;
