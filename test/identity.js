var fn = require('../build/fn');
var expect = require('chai').expect;

describe('.identity()', function () {

	it('should return the original argument', function () {
		expect( fn.identity('coffee') ).to.equal('coffee');
		expect( fn.identity(12345) ).to.equal(12345);

		var func = function() { return 'some function'; };
		expect( fn.identity(func) ).to.equal(func);

		var obj = { a: { b: { c: 'hello world!' } } };
		expect( fn.identity(obj) ).to.equal(obj);
	});
});
