const router = require('express').Router();
const orderController = require('../controllers/order.controller.js');
const isAuth = require("../middlewares/isAuth");

router.get('/orders/me', isAuth, orderController.getUserOrders);
router.get('/orders', orderController.getOrders);
router.post('/orders', orderController.createOrder);

module.exports = router;