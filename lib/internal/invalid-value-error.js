module.exports = InvalidValueError;

function InvalidValueError(message) {
  this.name = 'InvalidValueError';
  this.message = message;
  this.stack = (new Error).stack;
}
InvalidValueError.prototype = Object.create(Error.prototype);
InvalidValueError.prototype.constructor = InvalidValueError;

InvalidValueError.prepend = function(message, error) {
  if (error instanceof InvalidValueError) {
    error.message = message + ': ' + error.message;
  }
  return error;
};
