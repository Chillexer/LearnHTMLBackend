var bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    express     = require("express"),
    request     = require('request'),
    app         = express(),
    sizeOf      = require('image-size'),
    fs          = require("fs");

    var updated = false;
    
    var download = function(uri, filename, callback){
      request.head(uri, function(err, res, body){
        request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
      });
    };

// APP CONFIG    
mongoose.connect("mongodb://192.168.1.21:27017/restful_blog_app", {useMongoClient: true});
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
    Blog.create(req.body.blog, function (err, newBlog) {
            if (err) {
               res.render("new");
            } else {
                updated = false;
                Blog.find({}, function (err,blog) {
                    blog.forEach(function(body) {
                        if(updated){
                            return;
                        }
                        if(newBlog.image == body.source){
                            
                            Blog.update({_id: newBlog._id} , {$set: {image: "/images/" + body._id + ".png", source: newBlog.image}}, function () {
                                console.log(body._id);
                                console.log(body.source);
                                console.log(body.image);
                                updated = true;
                            });
                            updated = true;
                        }
                    })
                    if (!updated) {
                        download(req.body.blog.image, __dirname + "/public/images/" + newBlog._id + ".png", function(){
                            var dimensions = sizeOf(__dirname + "/public/images/" + newBlog._id + ".png");
                            
                            var width = Number(dimensions.width);
                            var height = Number(dimensions.height);
                            if (width > 2000 || height > 2000) {
                                res.redirect("/blogs");
                            } else if(width < 2000 || height < 2000) {
                                Blog.update({_id: newBlog._id} , {$set: {image: "/images/" + newBlog._id + ".png", source: newBlog.image}}, function(){
                                res.redirect("/blogs");  
                                });
                            }                        
                           });  
                    }
                    else{
                            res.redirect("/blogs");
                    }
                });
           }
       }) 
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


    