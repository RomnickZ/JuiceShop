const mongoose = require("mongoose");

//Create a Schema
const orderSchema = new mongoose.Schema({
    "fullName": { type: String },
    "contactNumber": { type: String },
    "product1": {
        quantity: { type: Number },
        price: { type: Number }
    },
    "product2": {
        quantity: { type: Number },
        price: { type: Number }
    },
    "product3": {
        quantity: { type: Number },
        price: { type: Number }
    },
    "subtotal": { type: Number },
    "taxRate": { type: Number },
    "total": { type: Number }
});

//Create a Model
const Order = mongoose.model("orders", orderSchema);

//Export the Model
module.exports = {
    Order
}