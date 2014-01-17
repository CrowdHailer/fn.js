var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.filter()', function () {

	it('should reduce the elements of an array based on an evaluating expression', function () {
		var collection = [1, 'string', true, undefined, [], {}, NaN];

		var result = fn.filter(function (value) {
			return !!value;
		}, collection);

		expect(result).to.have.length(5);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal('string');
		expect(result[2]).to.be.true;
		expect(result[3]).to.be.an('array');
		expect(result[4]).to.be.an('object');
	});

});