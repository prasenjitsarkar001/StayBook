const Booking = require("../models/booking");
const Listing = require("../models/listing");



// ==========================================
// BOOKING REVIEW / PREVIEW
// ==========================================

module.exports.preview = async (req, res) => {

    try {

        const { id } = req.params;

        const {
            checkIn,
            checkOut,
            guests,
            rooms
        } = req.body;


        // ==========================================
        // FIND LISTING
        // ==========================================

        const listing = await Listing.findById(id);

        if (!listing) {

            req.flash(
                "error",
                "Listing not found!"
            );

            return res.redirect("/listings");
        }


        // ==========================================
        // VALIDATE DATES
        // ==========================================

        const startDate =
            new Date(`${checkIn}T00:00:00`);

        const endDate =
            new Date(`${checkOut}T00:00:00`);


        if (
            isNaN(startDate.getTime()) ||
            isNaN(endDate.getTime())
        ) {

            req.flash(
                "error",
                "Invalid dates."
            );

            return res.redirect(
                `/listings/${id}`
            );
        }


        const difference =
            endDate - startDate;


        const nights =
            Math.ceil(
                difference /
                (1000 * 60 * 60 * 24)
            );


        if (nights <= 0) {

            req.flash(
                "error",
                "Please select valid dates."
            );

            return res.redirect(
                `/listings/${id}`
            );
        }


        // ==========================================
        // VALIDATE GUESTS & ROOMS
        // ==========================================

        const guestCount =
            parseInt(guests);

        const roomCount =
            parseInt(rooms);


        if (
            !guestCount ||
            guestCount < 1 ||
            !roomCount ||
            roomCount < 1
        ) {

            req.flash(
                "error",
                "Invalid booking details."
            );

            return res.redirect(
                `/listings/${id}`
            );
        }


        // ==========================================
        // CALCULATE PRICE
        // ==========================================

        const basePrice =
            listing.price *
            nights *
            roomCount;


        const tax =
            Math.round(
                basePrice * 0.18
            );


        const totalAmount =
            basePrice + tax;


        // ==========================================
        // CREATE BOOKING
        // ==========================================

        const booking =
            new Booking({

                listing:
                    listing._id,

                user:
                    req.user._id,

                checkIn:
                    startDate,

                checkOut:
                    endDate,

                nights:
                    nights,

                guests:
                    guestCount,

                rooms:
                    roomCount,

                basePrice:
                    basePrice,

                tax:
                    tax,

                totalAmount:
                    totalAmount,

                razorpayOrderId:
                    `pending_${Date.now()}_${listing._id}`,

                paymentStatus:
                    "created"
            });


        // ==========================================
        // SAVE BOOKING
        // ==========================================

        await booking.save();


        console.log(
            "================================"
        );

        console.log(
            "✅ BOOKING CREATED"
        );

        console.log(
            "Booking ID:",
            booking._id
        );

        console.log(
            "User ID:",
            booking.user
        );

        console.log(
            "Listing ID:",
            booking.listing
        );

        console.log(
            "Total:",
            booking.totalAmount
        );

        console.log(
            "================================"
        );


        // ==========================================
        // POPULATE LISTING
        // ==========================================

        await booking.populate("listing");


        // ==========================================
        // RENDER REVIEW PAGE
        // ==========================================

        res.render(
            "bookings/review.ejs",
            {
                booking
            }
        );


    } catch (error) {

        console.log(
            "❌ BOOKING PREVIEW ERROR:"
        );

        console.log(error);


        req.flash(
            "error",
            "Unable to create booking."
        );


        return res.redirect(
            "/listings"
        );
    }

};

// Booking Confirmation
module.exports.confirmation = async (req, res) => {

    try {

        const { id } = req.params;

        const booking = await Booking.findOne({
            _id: id,
            user: req.user._id
        }).populate("listing");


        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/listings");
        }

        // console.log("BOOKING ID:", booking._id);
        // console.log("PAYMENT STATUS:", booking.paymentStatus);
        // console.log("PAYMENT ID:", booking.razorpayPaymentId);
        // console.log("RAZORPAY ORDER ID:", booking.razorpayOrderId);



        // Don't show success page if payment is not completed
        if (booking.paymentStatus !== "paid") {
            return res.render("bookings/pending.ejs", {
                booking
            });
        }


        res.render("bookings/confirmation.ejs", {
            booking
        });


    } catch (error) {

        console.log("Booking confirmation error:", error);

        req.flash("error", "Unable to load booking.");
        res.redirect("/listings");

    }
};


// My Bookings
module.exports.myBookings = async (req, res) => {

    try {

        const bookings = await Booking.find({
            user: req.user._id
        })
            .populate("listing")
            .sort({ createdAt: -1 });


        res.render("bookings/index.ejs", {
            bookings
        });


    } catch (error) {

        console.log("My bookings error:", error);

        req.flash("error", "Unable to load bookings.");
        res.redirect("/listings");

    }
};