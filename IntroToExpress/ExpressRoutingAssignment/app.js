var express = require("express");
var app = express();

app.get("/", function(req, res){
    console.log(req.headers['x-forwarded-for'] + " Made a Request");
    res.send("Hi there, welcome to my assingment");
});

app.get("/speak/:animal/", function(req, res){
    var speech;
    console.log(req.headers['x-forwarded-for'] + " Made a Request");
    if (req.params.animal === "pig")
    {
        speech = "Oink";
    }
    else if (req.params.animal === "cow")
    {
        speech = "Moo";
    }
    else if (req.params.animal === "dog"){
        speech = "Woof Woof";
    }
    res.send("The " + req.params.animal + " says '" + speech + "'");
});

app.get("/repeat/:data/:id/", function(req, res){
    var speech = "";
    console.log(req.headers['x-forwarded-for'] + " Made a Request");
   for (var i = 0; i < req.params.id; i++) {
       speech += req.params.data + " ";
   }
    res.send(speech);
});

app.get("*", function(req, res){
    console.log(req.headers['x-forwarded-for'] + " Made a Request");
    res.send("Sorry, page not found...What are you doing with your life?");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!")
});