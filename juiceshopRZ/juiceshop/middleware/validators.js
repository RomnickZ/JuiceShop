const { check, body, oneOf } = require("express-validator");
const { Login } = require("../models/loginModel");
const { Order } = require("../models/orderModel");

const orderValidators = [
    check("fullName")
        .not().isEmpty().withMessage("Please Enter your Full Name"),
    check("contactNumber")
        .matches(/^\d{3}-\d{3}-\d{4}$/).withMessage("Please Enter your Valid Contact Number"),
    check("product1")
        .optional({ checkFalsy: true })
        .isInt().withMessage("Product 1 should be a number"),
    check("product2")
        .optional({ checkFalsy: true })
        .isInt().withMessage("Product 2 should be a number"),
    check("product3")
        .optional({ checkFalsy: true })
        .isInt().withMessage("Product 3 should be a number"),
    oneOf([
        body("product1").not().isEmpty(),
        body("product2").not().isEmpty(),
        body("product3").not().isEmpty()
    ], { message: "At least One Product should be purchased!" }),
];

const loginValidators = [
    check("username").not().isEmpty().withMessage("Please Enter your Username"),
    check("password").not().isEmpty().withMessage("Please Enter your Password"),
    body("username").custom(async(username, {req}) => {
        let user = await Login.findOne ({ username: username, password: req.body.password }).exec();

        if(!user) {
            throw new Error ("Invalid Credentials")
        }
    })
];

module.exports = {
    orderValidators,
    loginValidators
}
