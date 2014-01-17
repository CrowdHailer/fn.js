var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.reverse()', function () {

	it('should contain an array of reversed values', function () {
		var values = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

		var result = fn.reverse(values);

		expect(result).to.have.length(9);
		expect(result[0]).to.equal(9);
		expect(result[1]).to.equal(8);
		expect(result[2]).to.equal(7);
		expect(result[3]).to.equal(6);
		expect(result[4]).to.equal(5);
		expect(result[5]).to.equal(4);
		expect(result[6]).to.equal(3);
		expect(result[7]).to.equal(2);
		expect(result[8]).to.equal(1);
	});

	it('should not be the same array', function () {
		var values = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

		var result = fn.reverse(values);

		expect(result).to.not.equal(values);
	});

});