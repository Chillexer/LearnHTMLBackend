var passportLocalMongoose = require("passport-local-mongoose"),
    LocalStrategy         = require("passport-local"),
    bodyParser            = require("body-parser"),
    mongoose              = require("mongoose"),
    passport              = require("passport"),
    express               = require("express"),
    User                  = require(__dirname + "/models/user"),
    app                   = express();

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://192.168.0.47:27017/auth_demo_app", {useMongoClient: true});

app.use(require("express-session")({
    secret: "Frederik Foss Nielsen",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.set("view engine", "ejs");
app.set('views', __dirname + '/views');
//Følgende linjer virker kun fordi at vi bruger passportLocalMongoose pp linje 9 i user.js filen
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", function (req, res) {
    res.render("home");
});

app.get("/secret", isLoggedIn, function (req, res) {
    res.render("secret");
});

//Auth Routes

app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", function (req, res) {
   User.register(new User({username: req.body.username}), req.body.password, function (err, user) {
      if (err) {
          console.log(err);
          return res.render(register);
      } else {
          passport.authenticate("local")(req, res, function () {
             res.redirect("/secret"); 
          });
      }
   });
});

//Login Routes
app.get("/login", function (req, res) {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
        successRedirect: "/secret",
        failureRedirect: "/login"
}), function (req, res) {
    
});

app.get("/logout", function (req, res) {
   req.logout();
   res.redirect("/"); 
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};


app.listen(3000, function() {
    console.log("server started")
});