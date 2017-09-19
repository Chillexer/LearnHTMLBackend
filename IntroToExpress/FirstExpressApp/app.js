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

app.get("*", function(req, res){
    console.log(req.headers['x-forwarded-for'] + " Made a Request");
    res.send("YOUR IP IS: " + req.headers['x-forwarded-for'] + " AND YOU ARE A STAR! ");
});
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server has started!!!")
});