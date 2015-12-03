var expect = require('chai').expect;

var Validate = require('../lib/internal/validate');
var InvalidValueError = Validate.InvalidValueError;

describe('Validate', function() {

  describe('.object', function() {
    var validate = Validate.object({
      a: Validate.number,
      b: Validate.optional(Validate.string)
    });

    it('returns a copy of a valid object', function() {
      var obj = {a: 1, b: 'hello'};
      expect(validate(obj)).to.deep.equal(obj);
      expect(validate(obj)).not.to.equal(obj);
    });

    it('respects optional properties', function() {
      expect(validate({a: 1})).to.deep.equal({a: 1});
    });

    it('rejects invalid properties', function() {
      expect(function() {
        validate({a: false});
      }).to.throw(InvalidValueError, /in property "a": not a number/);

      expect(function() {
        validate({a: 1, b: 2});
      }).to.throw(InvalidValueError, /in property "b": not a string/);
    });

    it('rejects when properties are missing', function() {
      expect(function() {
        validate({b: 'what?'});
      }).to.throw(InvalidValueError, /missing property "a"/);
    });

    it('rejects when unexpected properties are present', function() {
      expect(function() {
        validate({a: 1, b: 'hello', c: 'what?'});
      }).to.throw(InvalidValueError, /unexpected property "c"/);
    });

    it('rejects non-objects', function() {
      expect(function() {
        validate(true);
      }).to.throw(InvalidValueError, /not an Object/);
    });
  });

  describe('.array', function() {
    var validate = Validate.array(Validate.number);

    it('accepts arrays of valid elements', function() {
      expect(validate([])).to.deep.equal([]);
      expect(validate([1, 2])).to.deep.equal([1, 2]);
    });

    it('rejects non-arrays', function() {
      expect(function() {
        validate({});
      }).to.throw(InvalidValueError, /not an Array/);
    });

    it('rejects arrays of invalid elements', function() {
      expect(function() {
        validate([1, true]);
      }).to.throw(InvalidValueError, /at index 1: not a number/);
    });
  });

  describe('.oneOf', function() {
    var validate = Validate.oneOf(['one', 'two', 'three']);

    it('accepts the valid values', function() {
      expect(validate('one')).to.equal('one');
      expect(validate('two')).to.equal('two');
      expect(validate('three')).to.equal('three');
    });

    it('rejects other values', function() {
      expect(function() {
        validate('four');
      }).to.throw(InvalidValueError, /not one of "one", "two", "three"/);
    });
  });

  describe('.mutuallyExclusiveProperties', function() {
    var validate = Validate.mutuallyExclusiveProperties(['one', 'two', 'four']);

    it('accepts objects with none of the properties', function() {
      expect(validate({a: 1})).to.deep.equal({a: 1});
    });

    it('accepts objects with exactly one of the properties', function() {
      expect(validate({one: 1, three: 3})).to.deep.equal({one: 1, three: 3});
    });

    it('rejects objects with two of the properties', function() {
      expect(function() {
        validate({one: 1, four: 4});
      }).to.throw(InvalidValueError, /"one" and "four"/);
    });

    it('rejects objects with more than two of the properties', function() {
      expect(function() {
        validate({one: 1, two: 2, four: 4});
      }).to.throw(InvalidValueError, /"one", "two" and "four"/);
    });
  });

});
