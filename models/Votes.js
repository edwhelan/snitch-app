const db = require('./db');

class Votes {
  constructor(id, user_id, picture_id, upvoted, downvoted) {
    this.id = id,
      this.user_id = user_id,
      this.picture_id = picture_id,
      this.upvoted = upvoted,
      this.downvoted = downvoted
  }
  static addVote(user_id, upvoted, downvoted, picture_id) {
    return db.one(`
  insert into Votes
  (user_id, picture.id, upvoted, downvoted)
  values
  ($1, $2, $3)
  returning id`, [user_id, upvoted, downvoted]
    ).then(result => {
      const h = new Votes(result.id, picture_id, upvoted, downvoted)
      return h;
    })
  }


}

module.exports = Votes;