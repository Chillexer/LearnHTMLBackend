var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect("mongodb://192.168.0.111:27017/cat_app", {useMongoClient: true});

var catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

var Cat = mongoose.model("Cat", catSchema);

    var george = new Cat({
        name: "George",
        age: 11,
        temperament: "Grouchy"
    });

    george.save(function(err, cat){
        if(err){
            console.log("SOMETHING WENT WRONG!");
        } else {
            console.log("WE JUST SAVED A CAT TO THE DB");
            console.log(cat);
        }
    });

   Cat.create({
       name: "Snow White",
       age: 15,
       temperament: "Sweet"
   }, function(err, cat){
    if(err){
        console.log(err);
    } else {
        console.log("WE JUST SAVED A CAT TO THE DB");
        console.log(cat)
    }
   }); 
    
   Cat.find({}, function(err, cats){
       if(err){
           console.log("OH NO, ERROT!");
           console.log(err);
       } else {
           console.log("ALL THE CATS!");
           console.log(cats)
       }
   })
