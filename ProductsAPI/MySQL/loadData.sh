
#products
LOAD DATA LOCAL INFILE '/Users/austinmiller/Downloads/product.csv' INTO TABLE products FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
#Query OK, 1000011 rows affected, 38 warnings (10.00 sec)
#Records: 1000011  Deleted: 0  Skipped: 0  Warnings: 38

#features
LOAD DATA LOCAL INFILE '/Users/austinmiller/Downloads/features.csv' INTO TABLE features FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
#Query OK, 2219279 rows affected (19.90 sec)
#Records: 2219279  Deleted: 0  Skipped: 0  Warnings: 0

#styles
LOAD DATA LOCAL INFILE '/Users/austinmiller/Downloads/styles.csv' INTO TABLE styles FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
#Query OK, 1958102 rows affected (17.92 sec)
#Records: 1958102  Deleted: 0  Skipped: 0  Warnings: 0

#photos
LOAD DATA LOCAL INFILE '/Users/austinmiller/Downloads/photos.csv' INTO TABLE photos FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
#Query OK, 5655646 rows affected, 10 warnings (1 min 17.03 sec)
#Records: 5655646  Deleted: 0  Skipped: 0  Warnings: 10

#skus
LOAD DATA LOCAL INFILE '/Users/austinmiller/Downloads/skus.csv' INTO TABLE skus FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
#Query OK, 11323917 rows affected (1 min 34.78 sec)
#Records: 11323917  Deleted: 0  Skipped: 0  Warnings: 0

#related
LOAD DATA LOCAL INFILE '/Users/austinmiller/Downloads/related.csv' INTO TABLE related FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
#Query OK, 4508205 rows affected, 58 warnings (2 min 27.12 sec)
#Records: 4508263  Deleted: 0  Skipped: 58  Warnings: 58
