const express = require("express");
const router = express.Router();

const listingController = require("../controller/listing.js");
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const { listingSchema } = require("../schema.js");
const { isLoggedIn } = require("../middleware.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

const validateListing = (req, res, next) => {
    const { error } = listingSchema.validate(req.body);

    if (error) {
        const errMsg = error.details
            .map(detail => detail.message)
            .join(", ");

        throw new ExpressError(400, errMsg);
    }

    next();
};


//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedIn, listingController.renderNew);

// Show Route
router.get("/:id", wrapAsync(listingController.showListing));

//Create Route
router.post("/", validateListing, isLoggedIn, wrapAsync(listingController.createListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, wrapAsync(listingController.editListing));

//Update Route
router.put("/:id", isLoggedIn, validateListing, wrapAsync(listingController.updateListing));

//Delete Route
router.delete("/:id", isLoggedIn, wrapAsync(listingController.deleteListing));

module.exports = router;