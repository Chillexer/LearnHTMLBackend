var mongoose    = require("mongoose"),
    Campground  = require(__dirname + "/models/campground"),
    Comment     = require(__dirname + "/models/comment");

var data = [
    {
        name: "Cloud's Rest",
        image: "http://www.wildnatureimages.com/images%203/060731-372..jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate rhoncus lectus vitae maximus. Donec quis mi ante. Mauris quis faucibus magna. Quisque sit amet lorem nec arcu eleifend porta. Maecenas sit amet nunc ut risus porttitor pretium ac vitae lorem. Maecenas pharetra purus ipsum, et pretium dolor rhoncus sed. Phasellus eros sem, imperdiet ut posuere a, pellentesque id dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur id pretium orci. Vivamus vitae rutrum orci, quis rhoncus velit. Nullam finibus efficitur iaculis. Ut facilisis, ipsum ut tincidunt blandit, dui turpis bibendum lacus, non aliquet nunc mi id quam. Ut finibus, tellus a fermentum ultrices, justo neque dictum felis, ac lacinia lacus felis id nisl. Sed ac sapien lacinia, pharetra mi id, tincidunt arcu. Vivamus mattis eleifend dui non efficitur.  Maecenas lacinia in urna in consectetur. Ut volutpat elementum euismod. Nullam ac ex eget justo facilisis ultrices. Cras semper commodo venenatis. Mauris vel metus ut mi facilisis tincidunt. In eu vehicula neque. Duis nec pretium sem.  Nulla facilisi. Maecenas finibus sed magna eget suscipit. In bibendum vel lorem vel fermentum. Quisque sit amet tristique arcu. In hac habitasse platea dictumst. Maecenas felis felis, egestas eget felis in, sodales sagittis eros. Cras malesuada ante id ullamcorper malesuada. Praesent maximus elit felis, vel laoreet velit tristique nec. In nunc dui, sagittis nec dui a, blandit placerat tortor.  Fusce suscipit luctus lorem vel tincidunt. Etiam mollis aliquam ultricies. Proin ac venenatis ligula. Vivamus congue eros at orci scelerisque scelerisque. Morbi et elementum metus. Nulla tincidunt dolor vel est feugiat volutpat. In quis urna diam. Nulla facilisi. Duis quis tempor mi, at tempor magna. Vestibulum pulvinar vulputate orci, sit amet mollis augue vulputate quis."
    },
    {
        name: "Lake Camp",
        image: "http://img1.sunset.timeinc.net/sites/default/files/styles/1000x1000/public/image/2016/06/main/fall-camping-best-campgrounds-organ-pipe-cactus-national-monument-twin-peaks-1115.jpg?itok=11Jc3bMf",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate rhoncus lectus vitae maximus. Donec quis mi ante. Mauris quis faucibus magna. Quisque sit amet lorem nec arcu eleifend porta. Maecenas sit amet nunc ut risus porttitor pretium ac vitae lorem. Maecenas pharetra purus ipsum, et pretium dolor rhoncus sed. Phasellus eros sem, imperdiet ut posuere a, pellentesque id dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur id pretium orci. Vivamus vitae rutrum orci, quis rhoncus velit. Nullam finibus efficitur iaculis. Ut facilisis, ipsum ut tincidunt blandit, dui turpis bibendum lacus, non aliquet nunc mi id quam. Ut finibus, tellus a fermentum ultrices, justo neque dictum felis, ac lacinia lacus felis id nisl. Sed ac sapien lacinia, pharetra mi id, tincidunt arcu. Vivamus mattis eleifend dui non efficitur.  Maecenas lacinia in urna in consectetur. Ut volutpat elementum euismod. Nullam ac ex eget justo facilisis ultrices. Cras semper commodo venenatis. Mauris vel metus ut mi facilisis tincidunt. In eu vehicula neque. Duis nec pretium sem.  Nulla facilisi. Maecenas finibus sed magna eget suscipit. In bibendum vel lorem vel fermentum. Quisque sit amet tristique arcu. In hac habitasse platea dictumst. Maecenas felis felis, egestas eget felis in, sodales sagittis eros. Cras malesuada ante id ullamcorper malesuada. Praesent maximus elit felis, vel laoreet velit tristique nec. In nunc dui, sagittis nec dui a, blandit placerat tortor.  Fusce suscipit luctus lorem vel tincidunt. Etiam mollis aliquam ultricies. Proin ac venenatis ligula. Vivamus congue eros at orci scelerisque scelerisque. Morbi et elementum metus. Nulla tincidunt dolor vel est feugiat volutpat. In quis urna diam. Nulla facilisi. Duis quis tempor mi, at tempor magna. Vestibulum pulvinar vulputate orci, sit amet mollis augue vulputate quis."
    },
    {
        name: "Water Camp",
        image: "http://haileyidaho.com/wp-content/uploads/2015/01/Stanley-lake-camping-Credit-Carol-Waller-2011.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vulputate rhoncus lectus vitae maximus. Donec quis mi ante. Mauris quis faucibus magna. Quisque sit amet lorem nec arcu eleifend porta. Maecenas sit amet nunc ut risus porttitor pretium ac vitae lorem. Maecenas pharetra purus ipsum, et pretium dolor rhoncus sed. Phasellus eros sem, imperdiet ut posuere a, pellentesque id dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Curabitur id pretium orci. Vivamus vitae rutrum orci, quis rhoncus velit. Nullam finibus efficitur iaculis. Ut facilisis, ipsum ut tincidunt blandit, dui turpis bibendum lacus, non aliquet nunc mi id quam. Ut finibus, tellus a fermentum ultrices, justo neque dictum felis, ac lacinia lacus felis id nisl. Sed ac sapien lacinia, pharetra mi id, tincidunt arcu. Vivamus mattis eleifend dui non efficitur.  Maecenas lacinia in urna in consectetur. Ut volutpat elementum euismod. Nullam ac ex eget justo facilisis ultrices. Cras semper commodo venenatis. Mauris vel metus ut mi facilisis tincidunt. In eu vehicula neque. Duis nec pretium sem.  Nulla facilisi. Maecenas finibus sed magna eget suscipit. In bibendum vel lorem vel fermentum. Quisque sit amet tristique arcu. In hac habitasse platea dictumst. Maecenas felis felis, egestas eget felis in, sodales sagittis eros. Cras malesuada ante id ullamcorper malesuada. Praesent maximus elit felis, vel laoreet velit tristique nec. In nunc dui, sagittis nec dui a, blandit placerat tortor.  Fusce suscipit luctus lorem vel tincidunt. Etiam mollis aliquam ultricies. Proin ac venenatis ligula. Vivamus congue eros at orci scelerisque scelerisque. Morbi et elementum metus. Nulla tincidunt dolor vel est feugiat volutpat. In quis urna diam. Nulla facilisi. Duis quis tempor mi, at tempor magna. Vestibulum pulvinar vulputate orci, sit amet mollis augue vulputate quis."
    }
]
function seedDB() {
    //Remove all campgrounds
    Comment.remove({}, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log("removed comments!");
        }
    });
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

