-- USERS TABLE
-- a user has a name, email address, phone-number, and password.
create table users (
  id serial primary key,
  displayname varchar (100) not null unique,
  emailaddress varchar (150) not null unique,
  phonenumber varchar (10) not null unique,
  password varchar(400) not null
);

--PICTURES TABLE
-- a PICTURE has a vote value, the image URL, and a phonenumber it was submitted by
create table pictures (
  id serial primary key,
  votevalue integer,
  image varchar (500),
  phonenumber varchar (12)
);  

--VOTE TABLE
-- VOTES have a user_id and a picture_id either upvoted or downvoted
create table votes (
  id serial primary key,
  user_id integer references users (id),
  picture_id integer references pictures (id),
  upvoted boolean,
  downvoted boolean
)