const Razorpay = require("razorpay");
const crypto = require("node:crypto");

const Booking = require("../models/booking");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ==========================================
// CREATE RAZORPAY ORDER
// ==========================================

module.exports.createOrder = async (req, res) => {

    try {

        const { id } = req.params;


        // Find booking belonging to logged-in user
        const booking = await Booking.findOne({
            _id: id,
            user: req.user._id
        }).populate("listing");


        if (!booking) {

            req.flash(
                "error",
                "Booking not found!"
            );

            return res.redirect("/listings");
        }


        // Don't create another order if already paid
        if (booking.paymentStatus === "paid") {

            return res.redirect(
                `/bookings/${booking._id}`
            );
        }


        // Validate amount
        if (
            !booking.totalAmount ||
            booking.totalAmount <= 0
        ) {

            req.flash(
                "error",
                "Invalid booking amount!"
            );

            return res.redirect(
                `/listings/${booking.listing._id}`
            );
        }


        // Convert rupees to paise
        const amount =
            Math.round(
                booking.totalAmount * 100
            );


        // Razorpay order options
        const options = {

            amount: amount,

            currency: "INR",

            receipt:
                `booking_${booking._id}_${Date.now()}`
        };


        // Create Razorpay order
        const order =
            await razorpay.orders.create(
                options
            );


        // Save Razorpay order ID
        booking.razorpayOrderId =
            order.id;

        booking.paymentStatus =
            "created";

        await booking.save();


        // Show Razorpay checkout page
        return res.render(
            "payments/checkout.ejs",
            {
                listing: booking.listing,

                order: order,

                razorpayKeyId:
                    process.env.RAZORPAY_KEY_ID,

                booking: booking
            }
        );


    } catch (error) {

        console.log(
            "Create Razorpay order error:",
            error
        );

        req.flash(
            "error",
            "Unable to create payment order."
        );

        return res.redirect("/listings");
    }
};

// ==========================================
// VERIFY PAYMENT
// ==========================================

module.exports.verifyPayment = async (req, res) => {

    try {

        // Razorpay sends payment information
        // from the frontend

        if (!req.body) {

            return res.status(400).json({
                success: false,
                message: "Payment data is missing"
            });
        }


        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;


        // Validate payment data

        if (
            !razorpay_order_id ||
            !razorpay_payment_id ||
            !razorpay_signature
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Incomplete payment details"
            });
        }


        // ==========================================
        // GENERATE SIGNATURE
        // ==========================================

        const generatedSignature =
            crypto
                .createHmac(
                    "sha256",
                    process.env.RAZORPAY_KEY_SECRET
                )
                .update(
                    razorpay_order_id +
                    "|" +
                    razorpay_payment_id
                )
                .digest("hex");


        // ==========================================
        // VERIFY SIGNATURE
        // ==========================================

        if (
            generatedSignature !==
            razorpay_signature
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Payment verification failed"
            });
        }


        // ==========================================
        // FIND EXISTING BOOKING
        // ==========================================

        const booking =
            await Booking.findOne({

                razorpayOrderId:
                    razorpay_order_id,

                user:
                    req.user._id
            });


        if (!booking) {

            return res.status(404).json({

                success: false,

                message:
                    "Booking not found"
            });
        }


        // ==========================================
        // SAVE PAYMENT INFORMATION
        // ==========================================

        booking.razorpayPaymentId =
            razorpay_payment_id;

        booking.razorpaySignature =
            razorpay_signature;

        booking.paymentStatus =
            "paid";


        await booking.save();


        // ==========================================
        // SUCCESS
        // ==========================================

        return res.json({

            success: true,

            message:
                "Payment successful!",

            bookingId:
                booking._id
        });


    } catch (error) {

        console.log(
            "Payment verification error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Payment verification failed"
        });
    }

};