var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.toArray()', function () {

	var func = function () {
		return arguments;
	};

	it('should convert arguments to an array', function () {
		var result = fn.toArray( func(1, 'string', true) );

		expect( fn.is('array', result)).to.be.true;
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal('string');
		expect(result[2]).to.equal(true);
	});

});