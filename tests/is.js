var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.is()', function () {

	it('should match a string to a string', function () {
		expect( fn.is('string', 'string') ).to.be.true;
	});

	it('should not match a string to a number', function () {
		expect( fn.is('string', 'number') ).to.be.false;
	});

	it('should match a number to a number', function () {
		expect( fn.is(123, 'number') ).to.be.true;
	});

	it('should not match a number to a string', function () {
		expect( fn.is(123, 'string') ).to.be.false;
	});

	it('should match true to a boolean', function () {
		expect( fn.is(true, 'boolean') ).to.be.true;
	});

	it('should not match true to a string', function () {
		expect( fn.is(true, 'string') ).to.be.false;
	});

	it('should match an array to array', function () {
		expect( fn.is([], 'array') ).to.be.true;
	});

	it('should not match an array to object', function () {
		expect( fn.is([], 'object') ).to.be.false;
	});

	it('should match an object to object', function () {
		expect( fn.is({}, 'object') ).to.be.true;
	});

	it('should not match an object to array', function () {
		expect( fn.is({}, 'array') ).to.be.false;
	});

	it('should match a Date to date', function () {
		expect( fn.is(new Date(), 'date') ).to.be.true;
	});

	it('should not match a Date to number', function () {
		expect( fn.is(new Date(), 'number') ).to.be.false;
	});

	it('should match undefined to undefined', function () {
		expect( fn.is(undefined, 'undefined') ).to.be.true;
	});

	it('should not match undefined to null', function () {
		expect( fn.is(undefined, 'null') ).to.be.false;
	});

	it('should match null to null', function () {
		expect( fn.is(null, 'null') ).to.be.true;
	});

	it('should not match null to undefined', function () {
		expect( fn.is(null, 'undefined') ).to.be.false;
	});

	it('should match function to function', function () {
		expect( fn.is(function () {}, 'function') ).to.be.true;
	});

	it('should not match function to object', function () {
		expect( fn.is(function () {}, 'object') ).to.be.false;
	});

	it('should match a Regex to regexp', function () {
		expect( fn.is(new RegExp(), 'regexp') ).to.be.true;
	});

	it('should not match a Regex to object', function () {
		expect( fn.is(new RegExp(), 'object') ).to.be.false;
	});

});