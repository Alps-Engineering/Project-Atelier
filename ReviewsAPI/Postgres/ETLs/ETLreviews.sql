COPY reviews(review_id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/home/tim/HackReactor/Project-Atelier/ReviewsAPI/data/reviewsTest.csv'
DELIMITER ','
CSV HEADER;