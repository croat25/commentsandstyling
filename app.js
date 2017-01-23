var express = require("express"), 
        app = express(),
 bodyParser = require("body-parser"),
   mongoose = require("mongoose"),
   
   data     = require("./models/index"),
   Comment  = require("./models/comment"),
   seeddb   = require("./seeds");
   
   
 seeddb();  
mongoose.connect("mongodb://localhost/yelp_campv3");

  app.use(bodyParser.urlencoded({extended: true}));
  app.set("view engine","ejs");
  app.use(express.static(__dirname+"/public"));


app.get("/",function(req,res){
    res.render('landing');
});

//INDEX
app.get("/index",function(req,res){
   data.find({},function(err,data){
      if(err){
        console.log(err);
      }else{
          res.render("index/index", {data:data}); 
      }

    });
    
   
});

//CREATE
app.post("/index",function(req,res){
   //get data from form and add to camp grounds array
   //redirect back to campgroundspage
   
   var partname=req.body.partname;
   var img=req.body.img;
   var newobject={
       partname:partname,
       img:img
   }
   
   data.push(newobject);
   res.redirect("/index");
   
   
});
//SHOW FORM TO CREATE NEW PART
app.get("/index/new",function(req,res){
    res.render("index/new.ejs");
}); 

app.get("/index/:id",function(req,res){
    //find the part with provdided id
    //render show template
    data.findById(req.params.id).populate("comments").exec(function(err,founditem){
        if(err){
            console.log(err);
        }
        else{console.log(founditem);
            res.render("index/show",{data:founditem});
        }
    });
    
});



//====================================
//          Comment routs

//==========================


app.get("/index/:id/comments/new",function(req,res){
    //find index.by
    data.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
        }else{
             res.render("comments/new",{data:found});
        }
    })
   
});

app.post("/index/:id/comments",function(req,res){
    //lookup
    data.findById(req.params.id,function(err,found){
        if(err){
            console.log(err);
            
        }
        else{
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                    console.log(err);
                    res.redirect("/index");
                }
                else{
                    //console.log(comment);
                    found.comments.push(comment);
                    found.save();
                    res.redirect('/index/'+found._id)
                }
            })
        }
        
    });
    //create new comment
    //connect new comment to campground
    //redirect
});

app.listen(process.env.PORT, process.env.IP,function (){
   console.log("the yelp camp server has start"); 
});