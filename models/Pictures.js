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
  static getPictureById(id) {
    return db.one(`
  select *
  from pictures
  where id=$1`, [id])
      .then(result => {
        // const v = new Picture(id, result.votevalue, result.image, result.phonenumber);
        // return v;
        return result
      })
  }
  static getAllPictures() {
    return db.any(`
    select *
    from pictures
  `)
  }

  //Increase Vote value by 1 after user votes
  static incrementPicture(voteValue, id) {
    let newVoteValue = voteValue + 1;
    return db.result(`
  update pictures
  set voteValue=$1
  where id=$2`, [newVoteValue, id]
    ).then(r => {
      return r;
    })
  }

  //Decrease vote value by 1 after
  decrementPicture(voteValue) {
    newVoteValue = voteValue - 1;
    return db.result(`
  update pictures
  set voteValue=$1`, [newVoteValue]
    )
  }

}

module.exports = Picture;