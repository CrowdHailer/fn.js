(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.fn = {})));
}(this, function (exports) { 'use strict';

	function apply (handler, args) {
		return handler.apply(null, args);
	};

	function toArray (collection) {
		return Array.prototype.slice.call(collection);
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

	exports.apply = apply;
	exports.throttle = throttle;

}));