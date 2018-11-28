const db = require('./db');

const bcrypt = require('bcrypt');
const saltRounds = 10;

class User {
  constructor(id, displayname, emailaddress, phonenumber, passHash) {
    this.id = id,
      this.displayname = displayname,
      this.emailaddress = emailaddress,
      this.phonenumber = phonenumber,
      this.passHash = passHash
  }
  static addUser(displayname, emailaddress, phonenumber, password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
  }

}

module.exports = User