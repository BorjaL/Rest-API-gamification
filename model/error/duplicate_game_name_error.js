function DuplicateGameNameError(message) {
  this.name = "DuplicateGameNameError";
  this.message = message || "this game already exists";
}
DuplicateGameNameError.prototype = new Error();
DuplicateGameNameError.prototype.constructor = DuplicateGameNameError;

exports.DuplicateGameNameError = DuplicateGameNameError;