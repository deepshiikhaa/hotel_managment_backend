const mongoose = require("mongoose")

const hotel = new mongoose.Schema({

    name :{
        type : String ,
        required: true
    },
    room :{
        type : String ,
        required: true
    },
    location :{
        type : String ,
        required: true
    },
    price :{
        type : Number ,
        required: true
    },
    review :{
        type : String ,
        required: true
    },
    image :{
        type : String ,
        required: true
    }



})
module.exports = mongoose.model("Hotel",hotel);