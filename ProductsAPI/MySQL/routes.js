const controller = require('./controllers');
const router = require('express').Router();

router.get('/', controller.products.get);
router.get('/:product_id', controller.product_id.get);
router.get('/:product_id/styles', controller.styles.get);
router.get('/:product_id/related', controller.related.get);

module.exports = router;