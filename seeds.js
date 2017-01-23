var mongoose=require("mongoose");
var data = require("./models/index");
var comment = require("./models/comment");
var parts=[
                {
                    partname:"back pillow",
                    img:"http://www.needforseatusa.com/assets/images/products/replacement%20parts/lumbar_pillow_thumbnail.jpg",
                    price:29.90,
                    description:"this is short back pillow it feels like you are on cloud 9 and just wanna be seated for 24 hours a day"
                },
                {
                    partname:"short cylinder",
                    img:"http://www.needforseatusa.com/assets/images/products/replacement%20parts/short_cylinder_thumbnail.jpg",
                    price:14.90,
                    description:"this is short cyliner my friend"
                },
                {

                    partname:"regular cylinder",
                    img:"http://www.needforseatusa.com/assets/images/products/replacement%20parts/cylinder_thumbnail.jpg",
                    price:14.90,
                    description:"this is short cyliner my friend"
                }
    ];


function seeddb(){
    //Remove all campgrounds
    data.remove({},function(err){
    if(err){
        console.log(err);
    }else{
        console.log("removed index!");
    }
    parts.forEach(function(seed){
       data.create(seed,function(err,data){
           if(err){
               console.log(err);
               
           }
           else{
               console.log("added a part");
               //create a comment
               comment.create(
                   {
                       text:"this place is greate but i wish there was internet",
                       author:"homer"
                     },function(err,comment){
                       if(err){
                           console.log(err);
                         } else{
                         data.comments.push(comment);
                         data.save();
                             console.log("created new comment");
                         }
                   });
     }
       }); 
    });
});

    
    
                    


    
}
module.exports=seeddb;


