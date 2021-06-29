COPY char_reviews
FROM '/home/tim/HackReactor/Project-Atelier/ReviewsAPI/data/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;


SELECT setval('char_reviews_id_seq', max(id)) FROM char_reviews;