const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const date=require(__dirname + "/mod_date.js")
const app=express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://groot:groot@cluster0.x0uc8.mongodb.net/userDB");


const itemsSchema = {
  name: String
};
const Item= mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "test 1"
});
const item2 = new Item({
  name: "test 2"
});

const defaultItems= [item1, item2];

// var newItems=[];
app.get("/",function(req,res){
  // res.send("this too bitchhhh");
  Item.find({}, function(err, foundItems){
    // console.log(foundItems);
    if(foundItems.length === 0)
    {
        Item.insertMany(defaultItems, function(err){
          if(err)
            console.log(err);
          else
            console.log("NIONoiewnoif");
        });
        res.redirect("/");
    }
    else
    {
      var day=date();
      res.render("list",{day: day, newItems: foundItems});
    }
  });
});

app.post("/",function(req,res){
  var newItem=req.body.new_list_item;
  // newItems.push(newItem);
  // console.log(newItem);
  const itemX = new Item({
    name: newItem
  });
  var itemXX=[itemX];
  Item.insertMany(itemXX, function(err){
    if(err)
    console.log(err);
  });
  res.redirect("/");
});

app.post("/delete", function(req,res){
  const delpls = req.body.del;
  Item.findByIdAndRemove( delpls , function(err){
    if(err)
      console.log(err);
  });
  res.redirect("/");
});

app.listen(process.env.PORT || 6969,function(req,res){
  // console.log("works bitchhh");
})
