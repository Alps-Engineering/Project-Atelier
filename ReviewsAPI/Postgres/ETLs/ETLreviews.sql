COPY reviews(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/home/tim/HackReactor/Project-Atelier/ReviewsAPI/data/reviews.csv'
DELIMITER ','
CSV HEADER;

CREATE SEQUENCE review_id_seq;
SELECT setval('review_id', max(id)) FROM reviews;