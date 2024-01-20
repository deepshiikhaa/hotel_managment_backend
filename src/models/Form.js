const mongoose = require("mongoose")




const form = new mongoose.Schema({
    name :{
        type : String ,
        required: true
    },

    phoneNumber :{
        type : Number ,
        required : true 
    },
    email :{
        type : String,
        required:true
     },
    
     interest: {
        type : String,
        required:true 
     },
     message :{
        type : String,
        required:true
     }

},{timestamps:true})

module.exports = mongoose.model("Forms",form);