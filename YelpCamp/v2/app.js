var express     = require("express"), 
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://192.168.0.100:27017/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
})

var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
//  { 
//    name: "Granite Hill", 
//    image: "https://farm9.staticflickr.com/8225/8524305204_43934a319d.jpg",
//    description: "This is at huge granite hill, no bathrooms. No water. Beutiful granite!"
//  
//  },  function(err, campground){
//    if (err) {
//      console.log(err);
//    } else {
//      console.log("NEWLY CREATED CAMPGROUND: ");
//      console.log(campground);
//    }
//  });


app.get("/", function (req, res) {
  res.render("landing");
});

app.get("/campgrounds", function (req, res) {
  Campground.find({}, function(err, allCampgrounds){
    if (err) {
      console.log(err);
    } else{
      res.render("Index", { campgrounds: allCampgrounds });
    }
  })
  // res.render("campgrounds", { campgrounds: campgrounds });
});

app.post("/campgrounds", function (req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCampground = {name: name, image: image, description: desc};
  
  Campground.create(newCampground, function (err, newluCreated) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/campgrounds");
    }
  });
});

app.get("/campgrounds/new", function (req, res) {
  res.render("new");
});

app.get("/campgrounds/:id", function(req, res){
  Campground.findById(req.params.id, function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      res.render("show", {campground: foundCampground});
    }
  })
});

app.listen(3000, function () {
  console.log("YelpCamp has started!!!");
});