const db = require('./db');


class Picture {
  constructor(id, votevalue, image, phonenumber) {
    this.id = id,
      this.votevalue = votevalue,
      this.image = image,
      this.phonenumber = phonenumber
  }

  static addPicture(image, phonenumber) {
    return db.one(`
    insert into Pictures
      (votevalue, image, phonenumber)
        values
      ($1, $2, $3)
      returning id
    `, [0, image, phonenumber])
      .then(result => {
        const h = new Picture(result.id, 0, image, phonenumber);
        return h;
      })
  }

  static getAllPictures() {
    return db.any(`
    select *
    from pictures
  `)
  }

  incrementPicture(voteValue) {
    newVoteValue = voteValue + 1;
    return db.result(`
  update pictures
  set voteValue=$1`, [newVoteValue]
    )
  }


}

module.exports = Picture;