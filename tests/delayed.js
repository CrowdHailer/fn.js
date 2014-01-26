var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.delayed()', function () {

	it('should return a new function that when invoked, delays evaluation for a specified duration', function (done) {
		var then = Date.now();

		var delayedTime = fn.delayed(function () {
			expect(Date.now() - then).to.be.at.least(48);
			done();
		}, 50);

		delayedTime(1, 2, 3);
	});

});