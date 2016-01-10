export function apply (handler, args) {
	return handler.apply(null, args);
};

export function toArray (collection) {
	return Array.prototype.slice.call(collection);
};

function type (value) {
	// If the value is null or undefined, return the stringified name,
	// otherwise get the [[Class]] and compare to the relevant part of the value
	return value == null ?
		'' + value :
		Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

export function is (typeName, value) {
	return typeName === type(value);
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
