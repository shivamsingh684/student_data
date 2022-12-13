const mongoose = require("mongoose")
const user = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    UserName:{
        type: String,
        required:true,
        unique:true
    },
    Password:{
        type: String,
        required: true,
        trim: true
    },
    
},{ timestamps: true }


)

module.exports = mongoose.model('user', user)