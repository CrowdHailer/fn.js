var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.memoize()', function () {

	it('should cache the return value of a function without recomputing if the serializer remains unchanged', function (done) {
		var getTime = fn.memoize(function () {
			return Date.now();
		});

		var now = getTime('now');

		setTimeout(function () {
			expect(now).to.equal(getTime('now'));
			done();
		}, 0);
	});

	it('should recompute the return value of a function if the serializer changes', function (done) {
		var getTime = fn.memoize(function () {
			return Date.now();
		});

		var then = getTime('then');

		setTimeout(function () {
			expect(then).to.not.equal(getTime('now'));
			done();
		}, 500);
	});

	it('should apply the arguments to original function', function () {
		var echo = fn.memoize(function (a, b, c) {
			return [a, b, c];
		});

		var value = echo(1, 'a', true);

		expect(value).to.include.members([1, 'a', true]);
	});

	it('should allow overriding of the cache key serializer', function () {
		var didSerialize = false;

		var echo = fn.memoize(function (a, b, c) {
			return [a, b, c];
		}, function serialize(values) {
			didSerialize = true;
			return values[0].toString() + ' ' + values[1].toString() + values[2].toString();
		});

		var value = echo(1, 'a', true);

		expect(value).to.include.members([1, 'a', true]);
		expect(didSerialize).to.be.true;
	});

});

describe('.memoize.serialize()', function () {

	it('should serialize with type and JSON.stringify', function () {
		var obj = {
			a: 1,
			b: true,
			c: 'aliens'
		};

		var key1 = fn.memoize.serialize([obj]);
		var key2 = fn.memoize.serialize([true]);
		var key3 = fn.memoize.serialize([3]);
		var key4 = fn.memoize.serialize(['aliens']);

		expect(key1).to.equal((fn.type(obj) + '|' + JSON.stringify(obj)));
		expect(key2).to.equal('boolean|true');
		expect(key3).to.equal('number|3');
		expect(key4).to.equal('string|\"aliens\"');
	});

});