var InvalidValueError = require('./invalid-value-error');

var Validate = exports;

Validate.acceptAll = function(value) {
  return value;
};

Validate.optional = function(validator) {
  return function(value) {
    return (value == undefined) ? value : validator(value);
  };
};

Validate.that = function(predicate, message) {
  return function(value) {
    if (predicate(value)) return value;
    throw new InvalidValueError(message);
  };
};

Validate.boolean = Validate.that(function(value) {
  return typeof value === 'boolean';
}, 'not a boolean');

Validate.number = Validate.that(function(value) {
  return typeof value === 'number';
}, 'not a number');

Validate.string = Validate.that(function(value) {
  return typeof value === 'string';
}, 'not a string');

Validate.object = function(propertyValidators) {
  return function(object) {
    var result = {};

    if (!object || typeof object !== 'object') {
      throw new InvalidValueError('not an Object');
    }

    // Validate all properties.
    for (key in propertyValidators) {
      var validator = propertyValidators[key];
      try {
        var valid = validator(object[key]);
      } catch (error) {
        if (key in object) {
          throw InvalidValueError.prepend('in property "' + key + '"', error);
        } else {
          throw new InvalidValueError('missing property "' + key + '"');
        }
      }
      if (key in object || valid !== undefined) {
        result[key] = valid;
      }
    }

    // Check for unexpected properties.
    for (var key in object) {
      if (!propertyValidators[key]) {
        throw new InvalidValueError('unexpected property "' + key + '"');
      }
    }

    return result;
  };
};

Validate.array = function(validator) {
  return function(array) {
    var result = [];

    if (Object.prototype.toString.call(array) !== '[object Array]') {
      throw new InvalidValueError('not an Array');
    }

    for (var i = 0; i < array.length; ++i) {
      try {
        result[i] = validator(array[i]);
      } catch (error) {
        throw InvalidValueError.prepend('at index ' + i, error);
      }
    }

    return result;
  };
};

Validate.oneOf = function(names) {
  var myObject = {};
  var quotedNames = [];
  names.forEach(function(name) {
    myObject[name] = true;
    quotedNames.push('"' + name + '"');
  });

  return function(value) {
    if (myObject[value]) return value;
    throw new InvalidValueError('not one of ' + quotedNames.join(', '));
  };
};

Validate.mutuallyExclusiveProperties = function(names) {
  return function(value) {
    if (!value) return value;

    var present = [];
    names.forEach(function(name) {
      if (name in value) {
        present.push('"' + name + '"');
      }
    });

    if (present.length > 1) {
      throw new InvalidValueError(
          'cannot specify properties '
          + present.slice(0, -1).join(', ')
          + ' and '
          + present.slice(-1)
          + ' together');
    }

    return value;
  };
};

Validate.compose = function(validators) {
  return function(value) {
    validators.forEach(function(validate) {
      value = validate(value);
    });
    return value;
  };
};
