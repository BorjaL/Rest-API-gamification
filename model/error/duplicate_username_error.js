function DuplicateUsernameError(message) {
  this.name = "DuplicateUsernameError";
  this.message = message || "this username already exists";
}
DuplicateUsernameError.prototype = new Error();
DuplicateUsernameError.prototype.constructor = DuplicateUsernameError;

exports.DuplicateUsernameError = DuplicateUsernameError;