export function apply (handler, args) {
	return handler.apply(null, args);
};

function toArray (collection) {
	return Array.prototype.slice.call(collection);
};

export function throttle (handler, msDelay) {
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
