DROP TABLE IF EXISTS reviews, photos, metadata;

CREATE TABLE reviews (
	review_id SERIAL PRIMARY KEY,
	product_id INT,
	rating SMALLINT,
  helpfulness SMALLINT,
  recommend boolean,
  reported boolean,
  reviewer_name CHAR ( 64 ),
  reviewer_email CHAR ( 64 ),
  date CHAR ( 32 ),
	summary VARCHAR ( 128 ),
	body VARCHAR ( 1024 ),
  response VARCHAR ( 1024 ),
  characteristics hstore
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL,
  url VARCHAR ( 512 )
);

CREATE TABLE metadata (
  product_id SERIAL PRIMARY KEY,
  ratings hstore,
  recommended hstore,
  characteristics hstore
);
