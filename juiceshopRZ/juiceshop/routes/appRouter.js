const express = require("express");
const router = express.Router();

const { getLogin, postLogin, getLogout } = require("../controllers/loginController");
const { getOrder, postOrder, getAllOrders } = require("../controllers/orderController");
const { loginValidators, orderValidators } = require("../middleware/validators");

router
    .get("/login", getLogin)
    .post("/login", loginValidators, postLogin)
    .get("/logout", getLogout)
    .get("/", getOrder)
    .post("/", orderValidators, postOrder)
    .get("/orders", getAllOrders)
    ;
    
module.exports = router;