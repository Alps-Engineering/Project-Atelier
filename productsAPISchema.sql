CREATE TABLE products(
  id INT AUTO_INCREMENT NOT NULL, -- product_id
  name VARCHAR(100) NOT NULL,
  slogan VARCHAR(100),
  description VARCHAR(2000),
  category VARCHAR(50),
  default_price INT,
  PRIMARY KEY (id),
);
CREATE TABLE features(
  id INT AUTO_INCREMENT NOT NULL, -- feature_id
  feature VARCHAR(100),
  value VARCHAR(100),
  product_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
);

CREATE TABLE styles(
  id INT AUTO_INCREMENT NOT NULL, -- style_id
  name VARCHAR(50) NOT NULL,
  original_price INT NOT NULL,
  sale_price INT,
  default? TINYINT,
  product_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
);
CREATE TABLE photos(
  id INT AUTO_INCREMENT NOT NULL, -- photo_id
  url VARCHAR(2000),
  thumbnail_url VARCHAR(2000),
  style_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id)
);
CREATE TABLE skus(
  id INT AUTO_INCREMENT NOT NULL, -- sku_id
  quantity INT,
  size VARCHAR(10),
  style_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (style_id)
);

CREATE TABLE related(
  id INT AUTO_INCREMENT NOT NULL, -- related_id
  related_product_id INT,
  product_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (product_id)
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