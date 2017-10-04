var LocalStrategy = require("passport-local"),
    bodyParser    = require("body-parser"),
    Campground    = require(__dirname + "/models/campground"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    Comment       = require(__dirname + "/models/comment"),
    express       = require("express"),
    seedDB        = require(__dirname + "/seeds.js"),
    User          = require(__dirname + "/models/user"),
    app           = express();

var campgroundRoutes = require(__dirname + "/routes/campgrounds"),
    commentRoutes = require(__dirname + "/routes/comments"),
    indexRoutes = require(__dirname + "/routes/index");



seedDB();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://192.168.0.43:27017/yelp_camp", { useMongoClient: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');

// PASSPORT CONFIGURATION
app.use(require("express-session")({
  secret: "World of Warcraft er et fantastisk spil",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes)

app.listen(3000, function () {
  console.log("YelpCamp has started!!!");
});