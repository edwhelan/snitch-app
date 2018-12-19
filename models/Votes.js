const db = require('./db');

class Votes {
  constructor(id, user_id, picture_id, upvoted, downvoted) {
    this.id = id,
      this.user_id = user_id,
      this.picture_id = picture_id,
      this.upvoted = upvoted,
      this.downvoted = downvoted
  }
  static addVote(user_id, picture_id, upvoted, downvoted) {
    return db.one(`
  insert into Votes
  (user_id, picture_id, upvoted, downvoted)
  values
  ($1, $2, $3, $4)
  returning id`, [user_id, picture_id, upvoted, downvoted]
    ).then(result => {
      const h = new Votes(result.id, user_id, picture_id, upvoted, downvoted)
      return h;
    })
  }

  //query to check if a user has voted on a specific image already
  static checkVoteExistence(user_id, picture_id) {
    return db.any(`
  select *
  from votes
  where user_id=$1 
  and 
  picture_id=$2
  `, [user_id, picture_id]
    ).then(r => {
      return r.length
    })
  }

}

module.exports = Votes;