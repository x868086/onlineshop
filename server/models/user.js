let mongoose=require('mongoose');
let Schema=mongoose.Schema;
let userSchema=new Schema({
    'userId':String,
    'userName':String,
    'userPwd':String,
    'orderList':Array,
    'cartList':[
        {
            "productImage" : String,
            "salePrice" : Number,
            "productName" : String,
            "productId" : String,
            "productNum" : String,
            "checked" : Boolean
        }
    ],
    'addressList':Array
})

let User=mongoose.model("User",userSchema,"users")

module.exports=User