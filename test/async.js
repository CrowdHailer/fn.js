var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.async()', function () {

	it('should return a new function that is always invoked at the end of the event loop', function (done) {
		var value = 10;

		var changeValue = fn.async(function () {
			value = 20;
		});

		changeValue();
		expect(value).to.equal(10);

		setTimeout(function () {
			expect(value).to.equal(20);
			done();
		}, 50)
	});

});