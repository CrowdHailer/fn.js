var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.delay()', function () {

	it('should delay the execution of the handler to at least the duration provided', function (done) {
		var then = Date.now();
		var duration = 50;

		fn.delay(function () {
			expect(Date.now() - then).to.be.at.least(duration);
			done();
		}, duration);
	});

});