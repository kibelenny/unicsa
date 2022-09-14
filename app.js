const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index")
})

app.get("/about", function(req, res){
    res.render("about")
})

app.get("/blog", function(req, res){
    res.render("blog")
})

app.get("/contact", function(req, res){
    res.render("contact")
})

app.listen(3000, function(){
    console.log("Server Running on Port 3000")
})