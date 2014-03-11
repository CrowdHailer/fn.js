'use strict';

var fn = {};

fn.toArray = function (collection) {
	return [].slice.call(collection);
};

fn.cloneArray = fn.toArray;

fn.op = {
	'+': function (value1, value2) {
		return value1 + value2;
	},
	'-': function (value1, value2) {
		return value1 - value2;
	},
	'*': function (value1, value2) {
		return value1 * value2;
	},
	'/': function (value1, value2) {
		return value1 / value2;
	},
	'==': function (value1, value2) {
		return value1 == value2;
	},
	'===': function (value1, value2) {
		return value1 === value2;
	}
};

fn.type = function (value) {
	// If the value is null or undefined, return the stringified name,
	// otherwise get the [[Class]] and compare to the relevant part of the value
	return value == null ?
		'' + value :
		({}).toString.call(value).slice(8, -1).toLowerCase();
};

fn.is = function (value, type) {
	return type === fn.type(value);
};

fn.apply = function (handler, args) {
	return handler.apply(null, args);
};

fn.concat = function () {
	var args = fn.toArray(arguments);

	return args[0].concat.apply(args[0], args.slice(1));
};

fn.partial = function () {
	var args = fn.toArray(arguments);
	var handler = args[0];
	var partialArgs = args.slice(1);

	return function () {
		return fn.apply(handler, fn.concat(partialArgs, fn.toArray(arguments)) );
	};
};

fn.curry = function (handler, arity) {
	if (handler.curried) {
		return handler;
	}

	arity = arity || handler.length;

	var curry = function curry() {
		var args = fn.toArray(arguments);

		if (args.length >= arity) {
			return handler.apply(null, args);
		}

		var inner = function () {
			return curry.apply(null, args.concat(fn.toArray(arguments)));
		};

		inner.curried = true;

		return inner;
	};

	curry.curried = true;

	return curry;
};

fn.properties = function (object) {
	var accumulator = [];

	for (var property in object) {
		if (object.hasOwnProperty(property)) {
			accumulator.push(property);
		}
	}

	return accumulator;
};

fn.each = function (handler, collection, params) {
	for (var index = 0, collectionLength = collection.length; index < collectionLength; index++) {
		fn.apply(handler, fn.concat([ collection[index], index, collection ], params));
	}
};

fn.reduce = function (handler, accumulator, collection, params) {
	fn.each(function (value, index) {
		accumulator = fn.apply(handler, fn.concat([ accumulator, value, index ], params));
	}, collection);

	return accumulator;
};

fn.filter = function (expression, collection) {
	return fn.reduce(function (accumulator, item, index) {
		expression(item, index) && accumulator.push(item);
		return accumulator;
	}, [], collection);
};

fn.op['++'] = fn.partial(fn.op['+'], 1);
fn.op['--'] = fn.partial(fn.op['+'], -1);

fn.map = function (handler, collection, params) {
	return fn.reduce(function (accumulator, value, index) {
		accumulator.push( fn.apply(handler, fn.concat([ value, index, collection ], params)) );
		return accumulator;
	}, [], collection);
};

fn.reverse = function (collection) {
	return fn.cloneArray(collection).reverse();
};

fn.pipeline = function () {
	var functions = fn.toArray(arguments);

	return function () {
		return fn.reduce(function (args, func) {
			return [ fn.apply(func, args) ];
		}, fn.toArray(arguments), functions)[0];
	};
};

fn.compose = function () {
	return fn.apply(fn.pipeline, fn.reverse(arguments));
};

fn.prop = fn.curry(function (name, object) {
	return object[name];
});

fn.merge = function () {
	return fn.reduce(function (accumulator, value) {
		fn.each(function (property) {
			accumulator[property] = value[property];
		}, fn.properties(value));

		return accumulator;
	}, {}, fn.toArray(arguments));
};

fn.memoize = function memoize(handler, serializer) {
	var cache = {};

	return function () {
		var args = fn.toArray(arguments);
		var key = serializer ? serializer(args) : memoize.serialize(args);

		return key in cache ?
			cache[key] :
			cache[key] = fn.apply(handler, args);
	};
};

fn.memoize.serialize = function (values) {
	return fn.type(values[0]) + '|' + JSON.stringify(values[0]);
};

fn.flip = function (handler) {
	return function () {
		return fn.apply(handler, fn.reverse(arguments));
	};
};

fn.delay = function (handler, msDelay) {
	return setTimeout(handler, msDelay);
};

fn.delayFor = fn.flip(fn.delay);

fn.delayed = function (handler, msDelay) {
	return function () {
		return fn.delay(fn.partial(handler, fn.toArray(arguments)), msDelay);
	};
};

fn.delayedFor = fn.flip(fn.delayed);

fn.async = fn.compose(fn.partial(fn.delayedFor, 0));

fn.throttle = function (handler, msDelay) {
	var throttling;

	return function () {
		var args = fn.toArray(arguments);

		if (throttling) {
			return;
		}

		throttling = fn.delay(function () {
			throttling = false;

			fn.apply(handler, args);
		}, msDelay);
	};
};

fn.debounce = function (handler, msDelay) {
	var debouncing;

	return function () {
		var args = fn.toArray(arguments);

		if (debouncing) {
			clearTimeout(debouncing);
		}

		debouncing = fn.delay(function () {
			debouncing = false;

			fn.apply(handler, args);
		}, msDelay);
	};
};
