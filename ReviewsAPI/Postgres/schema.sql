DROP TABLE IF EXISTS reviews, photos, characteristics, char_reviews;

CREATE TABLE reviews (
	review_id SERIAL PRIMARY KEY,
	product_id INT,
	rating SMALLINT,
  helpfulness SMALLINT,
  recommend boolean,
  reported boolean,
  reviewer_name VARCHAR ( 64 ),
  reviewer_email VARCHAR ( 64 ),
  date VARCHAR ( 32 ),
	summary VARCHAR ( 128 ),
	body VARCHAR ( 1024 ),
  response VARCHAR ( 1024 )
);

CREATE TABLE photos (
  id SERIAL PRIMARY KEY,
  review_id INT NOT NULL,
  url VARCHAR ( 512 )
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  product_id INT,
  name VARCHAR ( 16 )
);

CREATE TABLE char_reviews (
  id SERIAL PRIMARY KEY,
  characteristic_id INT,
  review_id INT,
  value SMALLINT
);