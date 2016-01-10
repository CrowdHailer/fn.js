var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.compose()', function () {

	var func = null;

	beforeEach(function() {
		func = fn.compose(
			function(x){ return x + 3; },
			function(x){ return x * 6; },
			function (num) {
				return Math.pow(num, 2);
			});
	});

	it('should return a new function', function () {
		expect(func).to.be.a('function');
	});

	it('should pass return values from right to left', function () {
		var result = func(7);

		expect(result).to.equal(297);
	});

});
