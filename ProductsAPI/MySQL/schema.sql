CREATE DATABASE productsSDC;

USE productsSDC;

-- DROP TABLE products, features;

CREATE TABLE products (
  product_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  slogan VARCHAR(100),
  product_description VARCHAR(2000),
  category VARCHAR(50),
  default_price VARCHAR(20),
  PRIMARY KEY (product_id)
);
CREATE TABLE features (
  feature_id INT AUTO_INCREMENT NOT NULL,
  product_id INT NOT NULL,
  feature VARCHAR(100),
  feature_value VARCHAR(100),
  PRIMARY KEY (feature_id),
  CONSTRAINT fk_product_features
  FOREIGN KEY (product_id)
    REFERENCES products(product_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

CREATE TABLE styles (
  style_id INT AUTO_INCREMENT NOT NULL,
  product_id INT NOT NULL,
  style_name VARCHAR(50) NOT NULL,
  sale_price VARCHAR(20),
  original_price VARCHAR(20) NOT NULL,
  default_style TINYINT,
  PRIMARY KEY (style_id),
  CONSTRAINT fk_product_styles
  FOREIGN KEY (product_id)
    REFERENCES products(product_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
CREATE INDEX prod_id ON styles (product_id);
CREATE INDEX sty_id ON styles (style_id);

CREATE TABLE photos (
  photo_id INT AUTO_INCREMENT NOT NULL,
  style_id INT NOT NULL,
  photo_url VARCHAR(2000),
  thumbnail_url VARCHAR(2000),
  PRIMARY KEY (photo_id),
  CONSTRAINT fk_style_photos
  FOREIGN KEY (style_id)
    REFERENCES styles(style_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
CREATE INDEX sty_id_photo ON photos (style_id);

CREATE TABLE skus (
  sku_id INT AUTO_INCREMENT NOT NULL,
  style_id INT NOT NULL,
  size VARCHAR(20),
  quantity INT,
  PRIMARY KEY (sku_id),
  CONSTRAINT fk_style_skus
  FOREIGN KEY (style_id)
    REFERENCES styles(style_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);
CREATE INDEX sty_id_sku ON skus (style_id);

CREATE TABLE related (
  related_id INT AUTO_INCREMENT NOT NULL,
  current_product_id INT NOT NULL,
  related_product_id INT,
  PRIMARY KEY (related_id),
  CONSTRAINT fk_current_product
  FOREIGN KEY (current_product_id)
    REFERENCES products(product_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE,
  CONSTRAINT fk_related_product
  FOREIGN KEY (related_product_id)
    REFERENCES products(product_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE
);

-- // products_to_x associations //
-- features: one to many
-- styles: one to many
-- related: one to many

-- // styles_to_x associations //
-- photos: one to many
-- skus: one to many
-- products: many to one

-- // features_to_x associations //
-- products: many to one

-- // photos_to_x associations //
-- styles: many to one

-- // skus_to_x associations //
-- styles: many to one

-- // related_to_x associations //
-- products: many to one
-- related: many to many

-- related table: related_product_id is foreign key that refers to 'related' (self-referencing foreign key)
-- this allows the related table to store the relationship between products that are related to current product
-- each product can have zero or many related products
-- each related product can have zero or many related products