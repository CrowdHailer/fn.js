var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.map()', function () {

	it('should return a new array of values', function () {
		var values = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

		var result = fn.map(function (value) {
			return value * 2;
		}, values);

		expect(result).to.have.length(9);
		expect(result[0]).to.equal(2);
		expect(result[1]).to.equal(4);
		expect(result[2]).to.equal(6);
		expect(result[3]).to.equal(8);
		expect(result[4]).to.equal(10);
		expect(result[5]).to.equal(12);
		expect(result[6]).to.equal(14);
		expect(result[7]).to.equal(16);
		expect(result[8]).to.equal(18);
	});

	it('should receive an index', function () {
		var values = [ 1, 2, 3 ];

		var result = fn.map(function (value, index) {
			return index;
		}, values);

		expect(result).to.have.length(3);
		expect(result[0]).to.equal(0);
		expect(result[1]).to.equal(1);
		expect(result[2]).to.equal(2);
	});

});