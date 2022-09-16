const express = require("express");
const bodyParser = require("body-parser");
const posts = require(__dirname + '/public/js/blog.js').sendPosts()
const dataDump = require(__dirname + '/public/js/blog.js').dataDump()
const lodash = require("lodash")

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
    res.render("index", {posts: posts,
                        data : dataDump})
})

app.get("/about", function(req, res){
    res.render("about")
})

app.get("/blog", function(req, res){
    res.render("blog", {posts : posts})
})

app.get("/contact", function(req, res){
    res.render("contact")
})

app.get("/membership", function(req, res){
    res.render("membership")
})

app.get("/advocacy", function(req, res){
    res.render('advocacy')
})

app.get('/:title', function(req, res){
    if(posts[req.params.title] !== undefined){
        res.render('blogposts', {blogTitle : req.params.title,
                                blogPost : posts[req.params.title]})
    }
})


app.listen(3000, function(){
    console.log("Server Running on Port 3000")
})