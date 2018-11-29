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

  // CREATE
  static addUser(displayname, emailaddress, phonenumber, password) {
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    //SQL QUERY
    return db.one(`
    insert into users
    (displayname, emailaddress, phonenumber, password)
      values
      ($1, $2, $3, $4)
      returning id
      `, [displayname, emailaddress, phonenumber, hash])
      .then(data => {
        const u = new User(data.id, displayname, emailaddress, phonenumber);
        return u;
      })
  }

  static getByEmail(email) {
    return db.one(`
    select *
    from users
    where emailaddress
    ilike '$1:raw'
    `, [email])
      .then(result => {
        const u = new User(result.id, result.displayname, result.emailaddress, result.phonenumber, result.password);
        return u;
      });
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.passHash);
  }

  //RETREIVE 

  // UPDATE

  // DELETE


}

module.exports = User;