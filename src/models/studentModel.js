const mongoose = require("mongoose")
const ObjectId= mongoose.Schema.Types.ObjectId;
const student=new mongoose.Schema({
    Name:{
        type:String,
        required: true
    },
    Subject:{
        type:String,
        enum:["Maths","Science","English","Hindi"],
        required:true
    },
    Marks:{
        type:Number,
        required:true
    },
    teacherId:{
        type:ObjectId,
        ref: "user",
        required:true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
    }, {timestamps: true})  

module.exports = mongoose.model('student', student)
