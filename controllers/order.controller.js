const Order = require('../models/order.model');
const Product = require('../models/product.model');


async function createOrder(req, res) {
    try {
        const data = req.body;
        const order  =  new Order(data);
        await checkOrderPrices(data.products);
        await checkOrderTotalPrice(data.products, data.totalPrice);
        const newOrder = await order.save();
        if (!newOrder) {
            
            return res.status(400).json({ message: 'Error creating order' , error: data }); 
        }
        else {
            return res.status(201).json({ message: 'Order created successfully', order: newOrder });
        }
    } 
    catch (error) {
        console.error(error); // Para ver en consola
        res.status(500).json({ 
            message: 'Error creating order', 
            error: error.message, // Solo el mensaje del error
            stack: error.stack    // Opcional para debug
        });
    }    
}

async function checkOrderTotalPrice(Products , totalPriceOrder) {
    let totalPrice = 0;
    for(const product of Products) {
        const productData = await Product.findById(product.product);
        if (!productData) {
            throw new Error(`Product with ID ${product.product} not found`);
        }
        totalPrice += productData.price * product.quantity;
    }
    if (totalPrice !== totalPriceOrder) {
        throw new Error(`Total price mismatch`);
    }
}

async function checkOrderPrices(Products) {
    for(const product of Products) {
        const productData = await Product.findById(product.product);
        if (!productData) {
            throw new Error(`Product with ID ${product.product} not found`);
        }
        if (productData.price !== product.price) {
            throw new Error(`Price mismatch for product ID ${product.product}`);
        }
    }
}
async function getOrders(req, res) {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email') 
            .populate('products.product', 'name price'); 
        if (!orders) {
            return res.status(404).json({ message: 'No orders found' });
        }
        else {
            return res.status(200).json({ message: 'Orders retrieved successfully', orders });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving orders', error });
    }   
}

module.exports = {
    createOrder,
    getOrders
}