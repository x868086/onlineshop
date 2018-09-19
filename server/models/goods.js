let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let productSchema=new Schema({
    "productId" : String,
    "productName" : String,
    "salePrice" : Number,
    "productImage" : String,
    "productUrl" : String,
    "productNum":Number,
    "checked":Boolean
})

let Good=mongoose.model("Good",productSchema)

module.exports=Good