const router = require('express').Router();
const orderController = require('../controllers/order.controller.js');

router.get('/orders', orderController.getOrders);
router.post('/orders', orderController.createOrder);

module.exports = router;