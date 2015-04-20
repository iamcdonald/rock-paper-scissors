'use strict';

function Future(fs) {
	this._callbacks = [];
	this._val = null;
}

Future.all = function (all) {
	var future = new Future();
	function check() {
		var vals = [];
		for (var i = 0; i < all.length; i++) {
			if (!all[i].getVal()) {
				return;
			} else {
				vals.push(all[i].getVal());
			}
		}
		future.resolve(vals);
	}
	
	for (var i = 0; i < all.length; i++) {
		all[i].then(check); 
	}
	check();
	return future.lock();
};

Future.prototype = {
	then: function (func) {
		if (!this._val) {
			this._callbacks.push(func);
		} else {
			func(this._val);
		}
	},
	lock: function () {
		var self = this;
		return {
			getVal: self.getVal.bind(self), 
			then: self.then.bind(self)
		};
	},
	resolve: function (val) {
		if (!this._val) {
			this._val = val;
			while(this._callbacks.length) {
				this._callbacks.pop()(val);
			}
		}
	},
	getVal: function () {
		return this._val;
	}
};

module.exports = Future;
