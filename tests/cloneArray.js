var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.cloneArray()', function () {

	it('should clone an array', function () {
		var arr = [ 1, 'string', true ];
		var clone = fn.cloneArray(arr);

		expect(arr).to.not.equal(clone);
		expect(clone).to.not.equal(arr);
		expect(arr[0]).to.equal(clone[0]);
		expect(arr[1]).to.equal(clone[1]);
		expect(arr[2]).to.equal(clone[2]);
	});

});