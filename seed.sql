insert into users
  (displayname, emailaddress, phonenumber, password)
    values
  ('bob', 'bob@bobmail.com', '4046686836', '$2b$10$MRBEiNjF1MiftaqbqwVJmuMg.JZXKk.RBJbL3N5cdkxn4qH/jb9eq'),
  ('tom', 'tom@bobmail.com', '4046686837', '$2b$10$MRBEiNjF1MiftaqbqwVJmuMg.JZXKk.RBJbL3N5cdkxn4qH/jb9eq'),
  ('ted', 'ted@bobmail.com', '4046686838', '$2b$10$MRBEiNjF1MiftaqbqwVJmuMg.JZXKk.RBJbL3N5cdkxn4qH/jb9eq'),
  ('fred', 'fred@bobmail.com', '4046686839', '$2b$10$MRBEiNjF1MiftaqbqwVJmuMg.JZXKk.RBJbL3N5cdkxn4qH/jb9eq'),
  ('kim', 'kim@bobmail.com', '4046686833', '$2b$10$MRBEiNjF1MiftaqbqwVJmuMg.JZXKk.RBJbL3N5cdkxn4qH/jb9eq'),
  ('whiskey', 'whiskey@bobmail.com', '4046686822', '$2b$10$MRBEiNjF1MiftaqbqwVJmuMg.JZXKk.RBJbL3N5cdkxn4qH/jb9eq'),
  ('Scotty', 'scotty@bobmail.com', '4046686855', '$2b$10$MRBEiNjF1MiftaqbqwVJmuMg.JZXKk.RBJbL3N5cdkxn4qH/jb9eq'),
  ('Jacky', 'jacky@bobmail.com', '4046686877', '$2b$10$MRBEiNjF1MiftaqbqwVJmuMg.JZXKk.RBJbL3N5cdkxn4qH/jb9eq');

insert into pictures
  (votevalue, image, phonenumber)
    values
  (1,'https://s3-external-1.amazonaws.com/media.twiliocdn.com/ACab9c691a6378037d225d48522f484e7d/77243fd3e9236eef1cb975b43c733b9b', '14046686836');

insert into votes 
  (user_id, picture_id, upvoted, downvoted)
    values
  (1, 1, TRUE, FALSE),
  (2, 1, TRUE, FALSE),
  (3, 1, TRUE, FALSE),
  (4, 1, FALSE, TRUE);