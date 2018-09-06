/**
 * User Entity (ES6 Class)
 */

class User {
  constructor(id, firstName, lastName, alias, photoPath) {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.alias = alias;
      this.photoPath = photoPath;
  }
}

module.exports = User;