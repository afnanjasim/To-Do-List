const express = require("express")
const https = require("https")
const app = express();
const bodyParser = require("body-parser")
const date = require(__dirname+"/date.js")

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine','ejs')  // view engine always uses views folder
app.use(express.static("public"))

var items=["buy Food", "COOK FOOD", "Enjoy FOod"]
var workItems=[]
app.get("/", function (req,res) {
    let day = date.getDate()
    res.render("list",{listTitle:day,newListItems:items})

})

app.post("/",(req,res)=>{
    var item = req.body.newItem

    if (req.body.list==="Work") {
        workItems.push(item)
        res.redirect("work")
    } else {
    items.push(item)
    res.redirect("/")
    }

    
})

app.get("/work",(req,res)=>{
    res.render("list",{listTitle:"Work", newListItems:workItems})
})
app.post("/work",(req,res)=>{
    item = req.body.newItem
    workItems.push(item)
    res.redirect("/work")
})

app.get("/about",(req,res)=>{
    res.render("about")
})


app.listen(3000, function() {
    console.log("server is running on port 3000");
})