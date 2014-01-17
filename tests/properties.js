var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.properties()', function () {

	it('should extract all own properties of an object', function () {
		var obj = {
			a: 1,
			b: 2,
			c: 3
		};

		var properties = fn.properties(obj);

		expect(properties).to.have.length(3);
		expect(properties).to.have.members(['a', 'b', 'c']);
	});

});