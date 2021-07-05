CREATE INDEX ON char_reviews USING HASH (characteristic_id);
CREATE INDEX ON reviews USING HASH (product_id);
CREATE INDEX ON characteristics USING HASH (product_id);