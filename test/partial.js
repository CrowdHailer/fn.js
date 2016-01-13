var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.partial()', function () {

	it('should partially apply arguments to a function', function () {
		var func = function (a, b, c, d, e) {
			return [ a, b, c, d, e ];
		};

		var partialFunc = fn.partial(func, 1, 'string', true);
		var result = partialFunc(3, false);

		expect(result.length).to.equal(5);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal('string');
		expect(result[2]).to.equal(true);
		expect(result[3]).to.equal(3);
		expect(result[4]).to.equal(false);
	});

});