const express = require("express");

const router = express.Router();

const paymentController = require("../controller/payment.js");
const { isLoggedIn } = require("../middleware.js");


// Create Razorpay Order
router.post(
    "/create-order/:id",
    isLoggedIn,
    paymentController.createOrder
);


// Verify Payment
router.post(
    "/verify",
    isLoggedIn,
    paymentController.verifyPayment
);


module.exports = router;