-- USERS TABLE
create table users (
  id serial primary key,
  displayname varchar (100) not null unique,
  emailaddress varchar (150) not null unique,
  phonenumber varchar (10) not null unique,
  password varchar(400) not null
);

--PICTURES TABLE
create table pictures (
  id serial primary key,
  votevalue integer,
  image varchar (500),
  phonenumber varchar (10),
  user_id integer references users (id)
);  