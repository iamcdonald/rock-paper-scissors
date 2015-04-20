/* global describe, it, beforeEach */
'use strict';

var assert = require('assert'),
	viewUtil = require('../../../src/views/view-util');

describe('views/view-util', function () {

	describe('getStringAsHtml', function () {
		it('returns a string as parsed HTML', function () {
			var str = '<div><div class="child"></div></div>';
			assert.equal(viewUtil.getStringAsHTML(str).firstChild.className, 'child');
		});
	});

});
