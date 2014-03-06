var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.flip()', function () {

	it('should swap the first two arguments', function () {
		var echo = fn.flip(function (a, b, c) {
			return [a, b, c];
		});

		var values = echo(1, 2, 3);

        expect(values[0]).to.equal(2);
        expect(values[1]).to.equal(1);
        expect(values[2]).to.equal(3);
	});

});
