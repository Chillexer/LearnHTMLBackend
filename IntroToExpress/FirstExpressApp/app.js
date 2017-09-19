var express = require("express");
var app = express();

app.get("/", function(req, res){
    res.send("Hi There!");
});

app.get("/bye", function(req, res){
    res.send("GoodBye!!!");
});

app.get("/dog", function(req, res){
    console.log("Someone Made a Request To /dog!!!");
    res.send("MEOW!");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!")
});