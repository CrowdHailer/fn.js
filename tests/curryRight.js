var fn = require('../build/fn');
var expect = require('chai').expect;

describe('.curryRight()', function () {

	it('should recursively apply arguments to a function, starting with the right-most argument and going leftward', function () {
		var append = fn.curryRight(function (a, b, c) {
			return a + b + c;
		});

		var appendIsm = append('ism');

		expect(appendIsm('pizza')('hot')).to.equal('hotpizzaism');
		expect(appendIsm('pizza', 'cold')).to.equal('coldpizzaism');
		expect(appendIsm('pizza')()()()('good')).to.equal('goodpizzaism');
	});

});
