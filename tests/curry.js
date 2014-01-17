var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.curry()', function () {

	it('should recursively apply arguments to a function', function () {
		var add = fn.curry(function (a, b, c) {
			return a + b + c;
		});

		var add37 = add(37);

		expect(add37(2, 3)).to.equal(42);
		expect(add37(5)(9)).to.equal(51);
		expect(add37(10)()()()()()()(20)).to.equal(67);
	});

});