var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.reduce()', function () {

	it('should fold an array of numbers into a single number', function () {
		var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

		var result = fn.reduce(function (accumulator, value) {
			return accumulator + value;
		}, 0, numbers);

		expect(result).to.equal(45);
	});

	it('should fold an array of strings into a single string', function () {
		var strings = [ 'hello', 'world', 'foo', 'bar', 'baz' ];

		var result = fn.reduce(function (accumulator, value) {
			return accumulator + value;
		}, '', strings);

		expect(result).to.equal('helloworldfoobarbaz');
	});

	it('should fold an array of arrays into a single array', function () {
		var arrays = [ [1, 2], [3, 4], [5, 6] ];

		var result = fn.reduce(function (accumulator, value) {
			return fn.concat(accumulator, value);
		}, [], arrays);

		expect(result).to.have.length(6);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal(2);
		expect(result[2]).to.equal(3);
		expect(result[3]).to.equal(4);
		expect(result[4]).to.equal(5);
		expect(result[5]).to.equal(6);
	});

	it('should fold an array of objects into a single array', function () {
		var people = [ { name: 'Bill' }, { name: 'Jim' }, { name: 'Steve' } ];

		var result = fn.reduce(function (accumulator, value) {
			accumulator.push(value.name);
			return accumulator;
		}, [], people);

		expect(result).to.have.length(3);
		expect(result[0]).to.equal('Bill');
		expect(result[1]).to.equal('Jim');
		expect(result[2]).to.equal('Steve');
	});

});