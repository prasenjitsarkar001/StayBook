const express = require("express");
const router = express.Router({ mergeParams: true });


const Listing = require("../models/listing");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const {  reviewSchema} = require("../schema.js");
const  reviewController = require("../controller/review.js");

const validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);

  if (error) {
    const errMsg = error.details
      .map(detail => detail.message)
      .join(", ");

    throw new ExpressError(400, errMsg);
  }

  next();
};



//review , post route
router.post("/", validateReview, wrapAsync(reviewController.reviewPost));

//delete review 
router.delete(
  "/:reviewId",
  wrapAsync(reviewController.deleteReview)
);



module.exports = router;