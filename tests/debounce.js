var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.debounce()', function () {

	it('should only allow one execution in a timeframe', function (done) {
		var iterations = 0;

		var increment = fn.debounce(function () {
			iterations++;
		}, 50);

		var interval = setInterval(increment, 10);

		fn.delay(function () {
			clearInterval(interval);

			fn.delay(function () {
				expect(iterations).to.equal(1);
				done();
			}, 100);
		}, 250);
	});

});