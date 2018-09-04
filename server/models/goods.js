let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let productSchema=new Schema({
    "productId" : String,
    "productName" : String,
    "salePrice" : Number,
    "productImage" : String,
    "productUrl" : String
})

let Goods=mongoose.model("Goods",productSchema)

module.exports=Goods