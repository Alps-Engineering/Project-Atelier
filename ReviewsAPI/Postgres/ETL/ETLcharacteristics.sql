COPY characteristics
FROM '/home/tim/HackReactor/Project-Atelier/ReviewsAPI/data/characteristics.csv'
DELIMITER ','
CSV HEADER;


SELECT setval('characteristics_id_seq', max(id)) FROM characteristics;