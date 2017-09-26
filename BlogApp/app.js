var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    request     = require('request'),
    app         = express(),
    fs          = require("fs");
    
    
    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        console.log('content-type:', res.headers['content-type']);
        console.log('content-length:', res.headers['content-length']);
    
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };
    
   // download('https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Hej14aug2010.JPG/1200px-Hej14aug2010.JPG', __dirname + "/public/images/google.png", function(){
   //   console.log('downloadet ' + req.body.blog.image);
   // });

// APP CONFIG    
mongoose.connect("mongodb://192.168.0.100:27017/restful_blog_app", {useMongoClient: true});
mongoose.Promise = global.Promise;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});

var Blog = mongoose.model("Blog", blogSchema);

// RESTFUL ROUTES

app.get("/", function (req, res) {
    res.redirect("/blogs");
})

app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs){
       if (err) {
           console.log(err);
       } else {
        res.render("index", {blogs: blogs});
       } 
    });
});

app.get("/blogs/new", function (req, res) {
    res.render("new");
});

app.post("/blogs", function (req, res) {
    download(req.body.blog.image, "/public/images/" + "test.png", function(){
        console.log('downloadet ' + req.body.blog.image);
        req.body.blog.image = "/public/images/" + "test.png";
        Blog.create(req.body.blog, function (err, newBlog) {
            if (err) {
               res.render("new");
            } else {
               res.redirect("/blogs")
           }
       }) 
        }); 
        
   
});

app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
        if (err) {
            res.redirect("/blogs");
        } else {
            res.render("show", {blog: foundBlog});
        }
    })
})



app.listen(3000, function () {
    console.log("Server is running!!!");
  });


    