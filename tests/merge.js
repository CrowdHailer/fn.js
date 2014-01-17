var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.merge()', function () {

	it('should merge two objects together into a new object', function () {
		var obj1 = {
			a: 1,
			b: null,
			c: undefined
		};

		var obj2 = {
			d: function () {},
			e: 'hello',
			f: {}
		};

		var merged = fn.merge(obj1, obj2);

		expect(merged).to.not.equal(obj1);
		expect(merged).to.not.equal(obj2);
		expect(merged.a).to.equal(1);
		expect(merged.b).to.be.null;
		expect(merged.c).to.be.undefined;
		expect(merged.d).to.be.a('function');
		expect(merged.e).to.equal('hello');
		expect(merged.f).to.be.an('object');
	});

	it('should overwrite properties as objects are merged from right into left', function () {
		var obj1 = {
			a: 1,
			b: null,
			c: undefined
		};

		var obj2 = {
			a: function () {},
			e: 'hello',
			f: {}
		};

		var obj3 = {
			b: 8,
			g: 'world',
			f: false
		};

		var merged = fn.merge(obj1, obj2, obj3);

		expect(merged).to.not.equal(obj1);
		expect(merged).to.not.equal(obj2);
		expect(merged).to.not.equal(obj3);
		expect(merged.a).to.be.a('function');
		expect(merged.b).to.equal(8);
		expect(merged.c).to.be.undefined;
		expect(merged.e).to.equal('hello');
		expect(merged.g).to.equal('world');
	});

});