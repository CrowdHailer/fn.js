var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.prop()', function () {

	it('should extract a value from an object by property name', function () {
		var obj = {
			a: 1,
			b: 2,
			c: 3
		};

		expect(fn.prop('a', obj)).to.equal(1);
		expect(fn.prop('b', obj)).to.equal(2);
		expect(fn.prop('c', obj)).to.equal(3);
	});

	it('should curry properties until object is received', function () {
		var obj1 = {
			a: 1
		};

		var obj2 = {
			a: 10
		};

		var obj3 = {
			a: 100
		};

		var getA = fn.prop('a');

		expect(getA(obj1)).to.equal(1);
		expect(getA(obj2)).to.equal(10);
		expect(getA(obj3)).to.equal(100);
	});

});