CREATE TABLE [IF NOT EXISTS] reviews (
	review_id SERIAL PRIMARY KEY,
	product_id NOT NULL FOREIGN KEY,
	rating SMALLINT NOT NULL,
  helpfulness SMALLINT,
  recommend boolean,
  reported boolean,
  reviewer_name CHAR ( 64 ),
  email CHAR ( 64 ),
  date CHAR ( 32 ),
	summary VARCHAR ( 64 ),
	body VARCHAR ( 1024 ),
  response VARCHAR ( 1024 ),
  characteristics hstore
);

CREATE TABLE [IF NOT EXISTS] photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL FOREIGN KEY,
  url VARCHAR ( 512 )
);

CREATE TABLE [IF NOT EXISTS] metadata (
  product_id SERIAL PRIMARY KEY,
  ratings hstore,
  recommended hstore,
  characteristics hstore
);