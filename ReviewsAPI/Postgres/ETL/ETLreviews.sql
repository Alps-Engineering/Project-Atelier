COPY reviews(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/home/tim/HackReactor/Project-Atelier/ReviewsAPI/data/reviews.csv'
DELIMITER ','
CSV HEADER;


SELECT setval('reviews_review_id_seq', max(review_id)) FROM reviews;