var middleware = require(__dirname + "/../middleware/index.js"),
    Campground = require(__dirname + "/../models/campground"),
    express    = require("express"),
    Comment    = require(__dirname + "/../models/comment"),
    router     = express.Router();

// ===================
// Campgrounds Routes
// ===================

// index route
router.get("/", function (req, res) {
    Campground.find({}, function (err, allCampgrounds) {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", { campgrounds: allCampgrounds });
        }
    });
});

// create route
router.post("/", middleware.isLoggedIn,function (req, res) {
    var name = req.body.name;
    var price = req.body.price;
    var image = req.body.image;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var desc = req.body.description;
    var newCampground = { name: name, price: price, image: image, description: desc, author: author};

    Campground.create(newCampground, function (err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    });
});

// new route
router.get("/new", middleware.isLoggedIn, function (req, res) {
    res.render("campgrounds/new");
});

// show route
router.get("/:id", function (req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found");
            res.redirect("back");
        } else {
            res.render("campgrounds/show", { campground: foundCampground });
        }
    });
});

// edit route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        res.render("campgrounds/edit", { campground: foundCampground });
    });
});
// update route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
        if (err) {
            res.redirect("campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// delete route
router.delete("/:id", middleware.checkCampgroundOwnership, function (req, res) {
    Campground.findById(req.params.id, function (err, foundCampground) {
        if (err) {
            res.redirect("back");
        } else {
            foundCampground.comments.forEach(function (id) {
                Comment.findByIdAndRemove(id, function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
            });
            Campground.findByIdAndRemove(req.params.id, function (err) {
                if (err) {
                    res.redirect("/campgrounds");
                } else {
                    res.redirect("/campgrounds");
                }
            });
        }
    });
});

module.exports = router;