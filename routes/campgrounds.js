const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync")
const ExpressErorr = require("../utils/ExpressError");
const {reviewSchema} = require ("../schemas.js");
const Campground = require("../models/campground");
const {isLoggedIn, isAuthor} = require("../middleware")
const campgrounds = require("../controllers/campgrounds")
const multer = require("multer")
const {storage} = require("../cloudinary")
const upload = multer({storage})

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), catchAsync (campgrounds.createCampground));

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router.route("/:id")
    .get(catchAsync (campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), catchAsync(campgrounds.updateCampground))
    .delete( isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;