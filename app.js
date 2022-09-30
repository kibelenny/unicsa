const express = require("express");
const bodyParser = require("body-parser");
const posts = require(__dirname + '/public/js/blog.js').sendPosts();
const dataDump = require(__dirname + '/public/js/blog.js').dataDump();
const lodash = require("lodash");
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.set("view engine", "ejs");


//Mongoose
mongoose.connect("mongodb://localhost:27017/uncsaDB")

const blogSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true, 'Missing blog title']
    },
    body : {
        type : String,
        required : [true, 'Missing blog body']
    }
})

const Blog = mongoose.model('Blog', blogSchema);


//GET Requests
app.get("/", function(req, res){
    res.render("index", {posts: posts,
                        data : dataDump})
})

app.get("/about", function(req, res){
    res.render("about")
})

app.get("/blog", function(req, res){
    Blog.find(function(err, data){
        if(!err){
            res.render('test', {data : data})
        }else{
            console.log(err);
        }
    })
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

app.get("/compose", function(req, res){
    res.render("compose");
})

app.get('/:title', function(req, res){
    Blog.find({title : req.params.title}, function(err, data){
        if (!err){
            res.render('blogposts', {data : data})
        }else{
            console.log(err);
        }
    })
})


//POST requests
app.post('/compose', function(req, res){
    const newBlog = new Blog({
        title : req.body.title,
        body : req.body.body 
    })

    newBlog.save()

    res.redirect('/compose')
})

app.listen(3000, function(){
    console.log("Server Running on Port 3000")
})