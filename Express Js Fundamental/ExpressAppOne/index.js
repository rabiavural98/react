var express=require('express');
app=express();

app.get("/one",function(req,res){
    res.send("This is simple string response");
})
app.post("/two",function(req,res){
    res.send("This is post simple string response");
})
// Response Status Code
app.get("/three",function(req,res){
    res.status(201).end("you don't any permission");
})
///Json Response
app.get("/four",function(req,res){
    let MyJSONArray=[
        {
            name:"Ariyan",
            city:"Dhaka"
        },
        {
        name:"Raju", 
        city:"USA"
        },
        {
            name:"joni",
            city:"India"
        },
    ]
    res.json(MyJSONArray);
})
// Response Download
app.get("/five",function(req,res){
    res.download("./uploads/about.jpg");
})

//Response Redirect
app.get("/usa",function(req,res) {
    res.redirect("http://localhost:8000/india");
})
app.get("/india",function(req,res){
    res.send("This is india page");
})
//Response Header
app.get("/six",function(req,res){
    res.append("name","Kazi Ariyan");
    res.append("city","Dhaka");

    res.status(201).end("This is Response Header");
})


//Response Set Cookies Data
app.get("/seven",function(req,res){
    res.cookie("name","Kazi Ariyan");
    res.cookie("city","Dhaka");
    res.cookie("age","35 Years Old");
    res.end("Cookie set successfully");
})
//Response Delete Cookies Data
app.get("/eight",function(req,res){
    res.clearCookie("name");
    res.clearCookie("city");
    res.clearCookie("age");
    res.end("Cookie clear successfully");
})
app.listen(8000,function(){
    console.log("Server Run Success")
})