const express = require("express");
const router = express.Router();

const bookingController = require("../controller/booking.js");
const { isLoggedIn } = require("../middleware.js");


// Booking review page
router.post(
    "/preview/:id",
    isLoggedIn,
    bookingController.preview
);
// My bookings
router.get(
    "/",
    isLoggedIn,
    bookingController.myBookings
);


// Booking confirmation
router.get(
    "/:id",
    isLoggedIn,
    bookingController.confirmation
);



module.exports = router;