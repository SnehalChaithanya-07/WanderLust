const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js")
const multer  = require('multer')
const {storage} = require("../cloudConfig.js") 
const upload = multer({ storage })


router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(isLoggedIn, upload.single('listing[image]'), wrapAsync(listingController.createListing));


//new route
router.get("/new", isLoggedIn,listingController.renderNewForm);  

router.get("/search", wrapAsync(async (req, res) => {
    const { country } = req.query;

    if (!country || country.trim() === "") {
        req.flash("error", "Please enter a country to search.");
        return res.redirect("/listings");
    }

    const listings = await Listing.find({
        country: { $regex: new RegExp(country.trim(), "i") }
    });

    res.render("listings/searchResults.ejs", { listings, country });
}));

router.route("/:id")
  .get(wrapAsync(listingController.ShowListing))
  .put(isLoggedIn, isOwner, upload.single('listing[image]'), validateListing, wrapAsync(listingController.updateListing))
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));


router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;