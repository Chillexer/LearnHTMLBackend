var mongoose    = require("mongoose"),
    Campground  = require(__dirname + "/models/campground"),
    Comment     = require(__dirname + "/models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "http://www.wildnatureimages.com/images%203/060731-372..jpg",
        description: "Blah Blah Blah"
    },
    {
        name: "Lake Camp",
        image: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=11Jc3bMf",
        description: "Blah Blah Blah"
    },
    {
        name: "Water Camp",
        image: "http://haileyidaho.com/wp-content/uploads/2015/01/Stanley-lake-camping-Credit-Carol-Waller-2011.jpg",
        description: "Blah Blah Blah"
    }
]
function seedDB() {
    //Remove all campgrounds
    Campground.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed campgrounds!");
        }
        //add a few campgrounds
        data.forEach(function (seed) {
            Campground.create(seed, function (err, campground) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("added a campground");
                    //create a comment
                    Comment.create({
                        text: "This place is great, but I wish there was internet",
                        author: "Homer"
                    }, function (err, comment) {
                        if (err) {
                            console.log(err);
                        } else{
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                        }
                    });
                }
            });
        });
    });

    //add a few comments
}

module.exports = seedDB;

