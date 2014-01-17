var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.each()', function () {

	it('should iterate over all the elements in a collection', function () {
		var collection = [1, 'string', true];
		var count = 0;

		fn.each(function () {
			count++;
			return false;
		}, collection);

		expect(count).to.equal(3);
	});

	it('should be passed a value as the first argument', function () {
		var collection = [1, 'string', true];
		var values = [];

		fn.each(function (value) {
			values.push(value);
		}, collection);

		expect(values).to.have.length(3);
		expect(values[0]).to.equal(1);
		expect(values[1]).to.equal('string');
		expect(values[2]).to.equal(true);
	});

	it('should be passed an index as the second argument', function () {
		var collection = [1, 'string', true];
		var indices = [];

		fn.each(function (value, index) {
			indices.push(index);
		}, collection);

		expect(indices).to.have.length(3);
		expect(indices[0]).to.equal(0);
		expect(indices[1]).to.equal(1);
		expect(indices[2]).to.equal(2);
	});

	it('should be passed the collection as the third argument', function () {
		var collection = [1, 'string', true];

		fn.each(function (value, index, copy) {
			expect(copy).to.equal(collection);
		}, collection);
	});

	it('should apply additional arguments to the handler', function () {
		var collection = [1, 2, 3];

		fn.each(function (value, index, collection, four, five, six) {
			expect(four).to.equal(4);
			expect(five).to.equal(5);
			expect(six).to.equal(6);
		}, collection, [4, 5, 6]);
	});

});