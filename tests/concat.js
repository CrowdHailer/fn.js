var fn = require('../build/fn');
var chai = require('chai');
var expect = chai.expect;

describe('.concat()', function () {

	it('should accept non-array as first argument', function () {
		var arr1 = [1, 'string', true ];

		var result = fn.concat(null, arr1);

		expect(result).to.have.length(4);
		expect(result).to.not.equal(arr1);
		expect(result[0]).to.equal(null);
		expect(result[1]).to.equal(1);
		expect(result[2]).to.equal('string');
		expect(result[3]).to.equal(true);

		result = fn.concat((void 0), arr1);

		expect(result).to.have.length(4);
		expect(result).to.not.equal(arr1);
		expect(result[0]).to.equal((void 0));
		expect(result[1]).to.equal(1);
		expect(result[2]).to.equal('string');
		expect(result[3]).to.equal(true);

		result = fn.concat(6, arr1);

		expect(result).to.have.length(4);
		expect(result).to.not.equal(arr1);
		expect(result[0]).to.equal(6);
		expect(result[1]).to.equal(1);
		expect(result[2]).to.equal('string');
		expect(result[3]).to.equal(true);
	});

	it('should accept non-array after first argument', function () {
		var arr1 = [ 1, 'string', true ];

		var result = fn.concat(arr1, "4");

		expect(result).to.have.length(4);
		expect(result).to.not.equal(arr1);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal('string');
		expect(result[2]).to.equal(true);
		expect(result[3]).to.equal("4");
	});

	it('should result in empty array when no arguments', function () {
		var result = fn.concat();

		expect(result).to.have.length(0);
	});

	it('should leave one array unchanged', function () {
		var arr1 = [1, 'string', true ];

		var result = fn.concat(arr1);

		expect(result).to.have.length(3);
		expect(result).to.not.equal(arr1);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal('string');
		expect(result[2]).to.equal(true);
	});

	it('should combine two arrays into one', function () {
		var arr1 = [ 1, 'string', true ];
		var arr2 = [ 2, 'newstring', false ];

		var result = fn.concat(arr1, arr2);

		expect(result).to.have.length(6);
		expect(result).to.not.equal(arr1);
		expect(result).to.not.equal(arr2);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal('string');
		expect(result[2]).to.equal(true);
		expect(result[3]).to.equal(2);
		expect(result[4]).to.equal('newstring');
		expect(result[5]).to.equal(false);
	});

	it('should combine three arrays into one', function () {
		var arr1 = [ 1, 'string', true ];
		var arr2 = [ 2, 'newstring', false ];
		var arr3 = [ 3, 'laststring', true ];

		var result = fn.concat(arr1, arr2, arr3);


		expect(result).to.have.length(9);
		expect(result).to.not.equal(arr1);
		expect(result).to.not.equal(arr2);
		expect(result).to.not.equal(arr3);
		expect(result[0]).to.equal(1);
		expect(result[1]).to.equal('string');
		expect(result[2]).to.equal(true);
		expect(result[3]).to.equal(2);
		expect(result[4]).to.equal('newstring');
		expect(result[5]).to.equal(false);
		expect(result[6]).to.equal(3);
		expect(result[7]).to.equal('laststring');
		expect(result[8]).to.equal(true);
	});

	it('should combine strings', function () {
		var str1 = "abc";
		var str2 = "def";

		var result = fn.concat(str1, str2);

		expect(result).to.equal(str1 + str2);
	});

	it('should combine with empty string', function () {
		var str1 = "abc";

		expect(fn.concat(str1, "")).to.equal(str1);
		expect(fn.concat("", str1)).to.equal(str1);
	});
});