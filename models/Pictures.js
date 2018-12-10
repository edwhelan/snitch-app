const db = require('./db');


class Picture {
  constructor(id, votevalue, image, phonenumber) {
    this.id = id,
      this.votevalue = votevalue,
      this.image = image,
      this.phonenumber = phonenumber
  }

  static addPicture(image, phonenumber, user_id) {
    return db.one(`
    insert into Pictures
      (votevalue, image, phonenumber, user_id)
        values
      ($1, $2, $3, $4)
      returning id
    `, [0, image, phonenumber, user_id])
      .then(result => {
        const h = new Picture(result.id, 0, image, phonenumber, user_id);
        return h;
      })
  }

  static getAllPictures() {
    return db.any(`
    select *
    from pictures
  `)
  }

  incrementPicture(id, voteValue) {
    newVoteValue = voteValue + 1;
    return db.result(`
  update pictures
  set voteValue=$1
  where id=$2`, [newVoteValue, id]
    )
  }


}

module.exports = Picture;