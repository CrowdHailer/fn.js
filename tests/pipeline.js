var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.pipeline()', function () {

	it('should return a new function', function () {

		var func = fn.pipeline(
			fn.partial( fn.op['+'], 3 ),
			fn.partial( fn.op['*'], 6 ),
			function (num) {
				return Math.pow(num, 2);
			});

		expect(func).to.be.a('function');
	});

	it('should pass return values from left to right', function () {
		var func = fn.pipeline(
			fn.partial( fn.op['+'], 3 ),
			fn.partial( fn.op['*'], 6 ),
			function (num) {
				return Math.pow(num, 2);
			});

		var result = func(7);

		expect(result).to.equal(3600);
	});

});