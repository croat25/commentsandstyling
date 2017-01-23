var mongoose = require("mongoose");

var chairSchema = new mongoose.Schema({
    partname:String,
    img:String,
    price:Number,
    description:String,
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
        ]
});

module.exports = mongoose.model("data",chairSchema);