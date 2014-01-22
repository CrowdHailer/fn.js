var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.throttle()', function () {

	it('should only allow a certain number of executions in a timeframe', function (done) {
		var iterations = 0;

		var increment = fn.throttle(function () {
			iterations++;
		}, 50);

		var interval = setInterval(increment, 10);

		fn.delay(function () {
			expect(iterations).to.be.at.most(10);
			clearInterval(interval);
			done();
		}, 500);
	});

});