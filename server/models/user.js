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
    'addressList':[
        {
            "addressId" : String,
            "userName" : String,
            "streetName" : String,
            "postCode" : String,
            "tel" : String,
            "isDefault" : Boolean
        }
    ]
})

let User=mongoose.model("User",userSchema,"users")

module.exports=User