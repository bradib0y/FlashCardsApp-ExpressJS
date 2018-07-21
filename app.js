const express = require("express");
const countryOfRequest = require("request-country");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());
app.set("view engine", "pug");
app.get("/", function(request, response){
    if(request.cookies.username){
    response.render("index.pug", {name: request.cookies.username});
    }
    else{
        response.redirect("/hello");
    }
});
app.get("/hello", function(request, response){
    response.render("hello.pug", {name: request.cookies.username});
});
app.post("/hello", function(request, response){
    response.cookie("username", request.body.username);    
    response.redirect("/");
});
app.get("/goodbye", function(request, response){
    response.render("goodbye.pug", {name: request.cookies.username});
});
app.post("/goodbye", function(request, response){
    response.clearCookie("username");    
    response.redirect("/");
});
app.listen(3000, ()=>{
    console.log("Server is running on localhost:3000")
});