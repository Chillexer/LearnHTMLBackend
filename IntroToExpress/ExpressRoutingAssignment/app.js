var express = require("express");
var app = express();

app.get("/", function(req, res){
    console.log(req.headers['x-forwarded-for'] + " Made a Request");
    res.send("Hi there, welcome to my assingment");
});

app.get("/speak/:animal/", function(req, res){
    var sounds = {
      pig: "Oink",
      cow: "Moo",
      dog: "Woof Woof!",
      cat: "Meow",
      rabbit: "boing"
    };
    var sound = "";
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
    res.send("The " + animal + " says '" + sound + "'");
    console.log(req.headers['x-forwarded-for'] + " Made a Request");
});

app.get("/repeat/:data/:id/", function(req, res){
    var message = "";
    console.log(req.headers['x-forwarded-for'] + " Made a Request");
   for (var i = 0; i < req.params.id; i++) {
       message += req.params.data + " ";
   }
    res.send(message);
});

app.get("*", function(req, res){
    console.log(req.headers['x-forwarded-for'] + " Made a Request");
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!")
});