const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    listing: {
        type: Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    checkIn: {
        type: Date,
        required: true
    },

    checkOut: {
        type: Date,
        required: true
    },

    nights: {
        type: Number,
        required: true,
        min: 1
    },

    guests: {
        type: Number,
        required: true,
        min: 1
    },

    rooms: {
        type: Number,
        required: true,
        min: 1
    },

    basePrice: {
        type: Number,
        required: true
    },

    tax: {
        type: Number,
        required: true
    },

    totalAmount: {
        type: Number,
        required: true
    },

    razorpayOrderId: {
        type: String,
        required: true
    },

    razorpayPaymentId: {
        type: String
    },

    razorpaySignature: {
        type: String
    },

    paymentStatus: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created"
    }

}, {
    timestamps: true
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;