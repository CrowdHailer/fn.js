(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.fn = {})));
}(this, function (exports) { 'use strict';

	function apply (handler, args) {
		return handler.apply(null, args);
	};

	function compose () {
		return apply(pipeline, toArray(arguments).reverse());
	};

	function concat () {
		var args = toArray(arguments);
		var first = args[ 0 ];

		if (!is('array', first) && !is('string', first)) {
			first = args.length ? [ first ] : [ ];
		}

		return first.concat.apply(first, args.slice(1));
	};

	var currier = function makeCurry(rightward) {
		return function (handler, arity) {
			if (handler.curried) {
				return handler;
			}

			arity = arity || handler.length;

			var curry = function curry() {
				var args = toArray(arguments);

				if (args.length >= arity) {
					var args = rightward ? args.reverse() : args;
					return apply(handler, args);
				}

				var inner = function () {
					return apply(curry, args.concat(toArray(arguments)));
				};

				inner.curried = true;

				return inner;
			};

			curry.curried = true;

			return curry;
		};
	};

	var curry = currier(false);

	var curryRight = currier(true);

	function identity (arg) {
		return arg;
	};

	function is (typeName, value) {
		return typeName === type(value);
	};

	function memoize(handler, serializer) {
		var cache = { };

		return function () {
			var args = toArray(arguments);
			var key = serializer ? serializer(args) : memoize.serialize(args);

			return key in cache ?
				cache[ key ] :
				cache[ key ] = apply(handler, args);
		};
	};

	memoize.serialize = function (values) {
		return type(values[ 0 ]) + '|' + JSON.stringify(values[ 0 ]);
	};

	function partial () {
		var args = toArray(arguments);
		var handler = args[ 0 ];
		var partialArgs = args.slice(1);

		return function () {
			return apply(handler, concat(partialArgs, toArray(arguments)) );
		};
	};

	function pipeline () {
		var functions = toArray(arguments);

		return function () {
			return reduce(function (args, func) {
				return [ apply(func, args) ];
			}, toArray(arguments), functions)[ 0 ];
		};
	};

	function reduce (handler, accumulator, collection, params) {
		collection.forEach(function (value, index) {
			accumulator = apply(handler, [ accumulator, value, index ].concat(params));
		});

		return accumulator;
	};

	function throttle (handler, msDelay) {
		var throttling;

		return function () {
			var args = toArray(arguments);

			if (throttling) {
				return;
			}

			throttling = setTimeout(function () {
				throttling = false;

				apply(handler, args);
			}, msDelay);
		};
	};

	function toArray (collection) {
		return Array.prototype.slice.call(collection);
	};

	function type (value) {
		// If the value is null or undefined, return the stringified name,
		// otherwise get the [[Class]] and compare to the relevant part of the value
		return value == null ?
			'' + value :
			Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
	};

	exports.apply = apply;
	exports.compose = compose;
	exports.concat = concat;
	exports.curry = curry;
	exports.curryRight = curryRight;
	exports.identity = identity;
	exports.is = is;
	exports.memoize = memoize;
	exports.partial = partial;
	exports.pipeline = pipeline;
	exports.throttle = throttle;
	exports.toArray = toArray;
	exports.type = type;

}));