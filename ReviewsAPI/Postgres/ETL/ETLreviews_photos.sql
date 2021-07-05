COPY photos
FROM '/home/tim/HackReactor/Project-Atelier/ReviewsAPI/data/reviews_photos.csv'
DELIMITER ','
CSV HEADER;


SELECT setval('photos_id_seq', max(id)) FROM photos;