# fn.js

`fn.js` is a library that forms a strategy for functional programming in JavaScript. This library differs from other similar libraries you may be used to as it strives to achieve purer adherence to functional programming tenets.

`NOTE: This project is in early stages and may undergo breaking changes while we work to make it much more robust and feature complete.`

## Installation

`fn.js` is a UMD module, so it can be used in the browser, Node.js, and AMD/require.js environments.

#### Node.js

```sh
npm install fn.js
```

```js
var fn = require('fn.js');
```

#### AMD require.js

```js
require.config({
    paths: {
        fn: 'path/to/fn'
    }
});
```

```js
define(['fn'], function (fn) {
    // fn now available
};
```

#### Traditional browser script include

```html
<script src="path/to/fn.js"></script>
<script>
    // fn now available
</script>
```

## Functional Programming

Functional programming, as opposed to imperative programming, is a programming paradigm where the flow of an application's code is directed by functions, not objects or procedures. If it helps, you may try to imagine functional programming as the opposite of object-oriented programming even though the parallels are not completely one-to-one.

Functional programming often involves creating abstractions through several layers of functions or function passing. Functional programming is often not more performant, but rather writing code becomes more efficient. Expressions can be written in a much more elegant and terse manner. Functional programming strives to employ some core tenets:

### Referential Transparency

In object-oriented or classic programming applications, the flow of code is controlled by creating objects that mimic real-world or virtual beings. As an example, if you were creating an application that allowed users to purchase a vehicle, you might create a `Vehicle` class or prototype to model the interaction that a user performs in customizing their vehicle. As a `Vehicle` instance is modified, other functionality in an application is triggered to execute, and so continues the flow.

In order to control the flow of the program, you must modify the state of objects or the state of an application. Different outcomes are possible based on the state of those objects or the application. In this manner, we can say that object-orientation lacks _referential transparency_.

_Referential transparency_ is the ability of code to be evaluated in a predictable manner, not influenced by external state. Code that has achieved referential transparency is only affected by arguments that are passed to it, and changing state in the application has no effect. That same code should always output the same value for a given set of arguments, and only changing those arguments can a value be different.

In object-orientation, changing the state of the `Vehicle` can change how functionality on the rest of the site works. In functional programming, we create functions that reads nothing external, only arguments passed to it.

Compare the following functions:

```js
var now = Date.now();

var getLater = function ( offset ) {
    return now + offset;
};

console.log( getLater( 15000 ) ); // invocation
```

```js
var getLater = function ( start, offset ) {
    return start + offset;
};

console.log( getLater( Date.now(), 15000 ) ); // invocation
```

In the first snippet, the `getLater` function accepts a single argument, but depends on external state from the `now` variable in order to properly operate. The second accepts both values as arguments, and so has no external dependency on state. #1 lacks referential transparency while #2 achieves it. By looking only at the invocation of `getLater` in each example, you cannot reliably predict the outcome of #1, while you can with #2.

Functional programming inherently tries to avoid making decisions based on state or mutable data that exists external to a function.

### Higher-order Functions

Functional programming is made possible through the use of higher-order functions. A higher-order function is a function that can _accept_ functions as arguments, and can even _return_ a function.

Higher-order functions facilitate interesting techniques:

1. Strategy pattern through _composition_
2. _Application_ and _currying_
2. _Recursion_
3. Operator and Mathematical _computation_
5. Visitor pattern through _folding_

### Immutability

Another core tenant of functional programming is _immutability_, or the inability for variables to changes their values once created. In other words, all things created should strive to be constants. In JavaScript there is no internal mechanism to enforce this as there is in pure functional programming languages like Haskell and friends. JavaScript is dynamic and without strict typing, and so keeping variables immutable in a codebase is merely a convention and cannot be enforced by fn.js. With that being said, fn.js strives to adhere to this rule and all methods used should treat all arguments passed as immutable. For example, using `.map` or `.reverse` will give you back new arrays, not mutate your existing arrays.

### Side Effects

The concept of side effects is closely related to the design pattern of the Single Responsibility Principle, or as I like to say: "A function should do one thing, and do it well." Any function that does something other than its single intended purpose is said to have _side effects_. In pure functional programming languages side effects are not allowed, but this is JavaScript and everything is fair game and must be enforced with conventions. For example, take the following method:

```javascript
var add = function (num1, num2) {
    return num1 + num2;
};
```

This `add` method takes 2 numbers and adds them together, and it only does its single purpose; it has no side effects. Now:

```javascript
var add = function (num1, num2) {
    var result = num1 + num2;

    console.log(result);

    return result;
};
```

Here the `add` method decides to log the results of the addition before returning the result. While the function still achieves its primary purpose, it is no longer free from side effects as it also logs a value in additional to trying to accomplish its goal.

Side effects and state mechanisms should be solved through other means of functional programming, e.g. monads.

## Coding Guide

Any code committed to this library must be evaluated for its adherence to referential transparency and efficient use of higher-order functions. As such, all external contributions must be made through pull request to facilitate the discussion around any new inclusions. Some functions by nature directly violate or bend referential transparency, so it is not always possible to adhere to this principle in every case, and exceptions can be made in those cases.
