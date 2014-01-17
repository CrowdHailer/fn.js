var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.compose()', function () {

	it('should return a new function', function () {

		var func = fn.compose(
			fn.partial( fn.op['+'], 3 ),
			fn.partial( fn.op['*'], 6 ),
			function (num) {
				return Math.pow(num, 2);
			});

		expect(func).to.be.a('function');
	});

	it('should pass return values from right to left', function () {
		var func = fn.compose(
			fn.partial( fn.op['+'], 3 ),
			fn.partial( fn.op['*'], 6 ),
			function (num) {
				return Math.pow(num, 2);
			});

		var result = func(7);

		expect(result).to.equal(297);
	});

});