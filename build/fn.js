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

	function identity (arg) {
		return arg;
	};

	function is (typeName, value) {
		return typeName === type(value);
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
	exports.identity = identity;
	exports.is = is;
	exports.pipeline = pipeline;
	exports.throttle = throttle;
	exports.toArray = toArray;

}));