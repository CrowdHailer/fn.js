(function(root, factory) {
    if(typeof exports === 'object') {
        module.exports = factory();
    }
    else if(typeof define === 'function' && define.amd) {
        define([], factory);
    }
    else {
        root.fn = factory();
    }
}(this, function() {
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

fn.is = function (value, type) {
    // If the value is null or undefined, return the stringified name,
    // otherwise get the [[Class]] and compare to the relevant part of the value:
    var valueType = value == null ?
        '' + value :
        ({}).toString.call(value).slice(8, -1).toLowerCase();

    return type === valueType;
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

    return function () {
        return fn.apply(args[0], fn.concat(args.slice(1), fn.toArray(arguments)) );
    };
};

fn.curry = function (handler, arity) {
    arity = arity || handler.length;

    return function curry() {
        var args = fn.toArray(arguments);

        if (args.length >= arity) {
            return handler.apply(null, args);
        }

        return function () {
            return curry.apply(null, args.concat(fn.toArray(arguments)) );
        };
    };
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

fn.reduce = function (handler, collection, accumulator, params) {
    fn.each(function (value, index) {
        accumulator = fn.apply(handler, fn.concat([ accumulator, value, index ], params));
    }, collection);

    return accumulator;
};

fn.filter = function (expression, collection) {
    return fn.reduce(function (accumulator, item, index) {
        expression(item, index) && accumulator.push(item);
        return accumulator;
    }, collection, []);
};

fn.op['++'] = fn.partial(fn.op['+'], 1);
fn.op['--'] = fn.partial(fn.op['+'], -1);

fn.map = function (handler, collection, params) {
    return fn.reduce(function (accumulator, value, index) {
        accumulator.push( fn.apply(handler, fn.concat([ value, index, collection ], params)) );
        return accumulator;
    }, collection, []);
};

fn.reverse = function (collection) {
    return fn.cloneArray(collection).reverse();
};

fn.pipeline = function () {
    var functions = fn.toArray(arguments);

    return function () {
        return fn.reduce(function (args, func) {
            return [ fn.apply(func, args) ];
        }, functions, fn.toArray(arguments))[0];
    };
};

fn.compose = function () {
    return fn.apply(fn.pipeline, fn.reverse(arguments));
};

fn.is = function (value, type) {
    // If the value is null or undefined, return the stringified name,
    // otherwise get the [[Class]] and compare to the relevant part of the value:
    var valueType = value == null ?
        '' + value :
        ({}).toString.call(value).slice(8, -1).toLowerCase();

    return type === valueType;
};
    return fn;
}));
