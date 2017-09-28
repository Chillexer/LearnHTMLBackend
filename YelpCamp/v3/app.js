var Campground  = require(__dirname + "/models/campground"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Comments     = require(__dirname + "/models/comment"),
    express     = require("express"),
    seedDB      = require(__dirname + "/seeds.js"),
   // User        = require(__dirname + "/models/user"), 
    app         = express();

 seedDB();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://192.168.0.47:27017/yelp_camp", {useMongoClient: true});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

if (/^win/.test(process.platform)) {
  app.set('views', __dirname + '/views');
  app.use(express.static(__dirname + '/public'));
}

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
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
    if(err){
      console.log(err);
    } else {
      console.log(foundCampground);
      res.render("show", {campground: foundCampground});
    }
  })
});

app.listen(3000, function () {
  console.log("YelpCamp has started!!!");
});