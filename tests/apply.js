var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.apply()', function () {

	var args = [ 1, 'string', true ];
	var func = function (a, b, c) {
		return [ a, b, c ];
	};

	it('should apply arguments to a function', function () {
		var result = fn.apply(func, args);

		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal('string');
		expect(result[2]).to.equal(true);
	});

});