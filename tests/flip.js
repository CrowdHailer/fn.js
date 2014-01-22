var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.flip()', function () {

	it('should reverse the order of argument application', function () {
		var echo = fn.flip(function (a, b, c) {
			return [a, b, c];
		});

		var values = echo(1, 2, 3);

		expect(values[0]).to.equal(3);
		expect(values[1]).to.equal(2);
		expect(values[2]).to.equal(1);
	});

});