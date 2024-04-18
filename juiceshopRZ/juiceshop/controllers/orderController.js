const { validationResult } = require("express-validator");
const { Order } = require("../models/orderModel");

const getOrder = (req, res) => {
    res.render("pages/order", { errors: [] });
}

const postOrder = async (req, res) => {
    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render("pages/order", { errors: errors.array() });
    } else {
        let fullName = req.body.fullName;
        let contactNumber = req.body.contactNumber;

        let product1Quantity = parseInt(req.body.product1) || 0;
        let product2Quantity = parseInt(req.body.product2) || 0;
        let product3Quantity = parseInt(req.body.product3) || 0;

        let product1Price = product1Quantity * 2.99;
        let product2Price = product2Quantity * 1.99;
        let product3Price = product3Quantity * 2.49;
        let subtotal = product1Price + product2Price + product3Price;

        let taxRate = subtotal * 0.13;

        let total = subtotal + taxRate;

        let newOrder = new Order ({
            fullName: fullName,
            contactNumber: contactNumber,

            product1: {
                quantity: product1Quantity,
                price: product1Price
            },
            product2: {
                quantity: product2Quantity,
                price: product2Price
            },
            product3: {
                quantity: product3Quantity,
                price: product3Price
            },

            subtotal: subtotal,
            taxRate: taxRate,
            total: total
        });

        newOrder.save()
            .then(() => {console.log(`Connected to Database!`)})
            .catch((error) => {console.log(error.message)});

        res.render("pages/receipt", {
            fullName: fullName,
            contactNumber: contactNumber,
    
            product1: {
                quantity: product1Quantity,
                price: product1Price
            },
            product2: {
                quantity: product2Quantity,
                price: product2Price
            },
            product3: {
                quantity: product3Quantity,
                price: product3Price
            },
            subtotal: subtotal,
            taxRate: taxRate,
            total: total
        });
    }
};

const getAllOrders = async (req, res) => {
    if(req.session.userLoggedIn){
        let orders = await Order.find({}).exec();
        res.render("pages/orders", { orders: orders });
    }else{
        res.redirect("/login");
    }
}

module.exports = {
    getOrder,
    postOrder,
    getAllOrders,
}
