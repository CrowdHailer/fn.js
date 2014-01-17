var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.op', function () {

	describe('+', function () {
		it('should add two numbers', function () {
			expect( fn.op['+'](1, 2) ).to.equal(3);
		});

		it('should concatenate two strings', function () {
			expect( fn.op['+']('hello', 'world') ).to.equal('helloworld');
		});
	});

	describe('-', function () {
		it('should subtract two numbers', function () {
			expect( fn.op['-'](3, 2) ).to.equal(1);
		});
	});

	describe('*', function () {
		it('should multiply two numbers', function () {
			expect( fn.op['*'](3, 2) ).to.equal(6);
		});
	});

	describe('/', function () {
		it('should divide two numbers', function () {
			expect( fn.op['/'](6, 2) ).to.equal(3);
		});
	});

	describe('==', function () {
		it('should weakly compare two values', function () {
			expect( fn.op['=='](3, 3) ).to.be.true;
			expect( fn.op['=='](false, 0) ).to.be.true;
			expect( fn.op['=='](false, 1) ).to.be.false;
			expect( fn.op['=='](null, undefined) ).to.be.true;
			expect( fn.op['=='](1/0, Infinity) ).to.be.true;
			expect( fn.op['==']('hello', 'hello') ).to.be.true;
			expect( fn.op['==']({}, {}) ).to.be.false;
		});
	});

	describe('===', function () {
		it('should strongly compare two values', function () {
			expect( fn.op['==='](3, 3) ).to.be.true;
			expect( fn.op['==='](false, 0) ).to.be.false;
			expect( fn.op['==='](false, 1) ).to.be.false;
			expect( fn.op['==='](null, undefined) ).to.be.false;
			expect( fn.op['==='](1/0, Infinity) ).to.be.true;
			expect( fn.op['===']('hello', 'hello') ).to.be.true;
			expect( fn.op['===']({}, {}) ).to.be.false;
		});
	});

	describe('++', function () {
		it('should increment a number', function () {
			expect( fn.op['++'](6) ).to.equal(7);
			expect( fn.op['++'](10) ).to.equal(11);
			expect( fn.op['++'](0) ).to.equal(1);
		});
	});

	describe('--', function () {
		it('should decrement a number', function () {
			expect( fn.op['--'](6) ).to.equal(5);
			expect( fn.op['--'](10) ).to.equal(9);
			expect( fn.op['--'](0) ).to.equal(-1);
		});
	});

});