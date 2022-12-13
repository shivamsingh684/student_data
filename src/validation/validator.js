const { default: mongoose } = require("mongoose");

const isvalidReqBody=(reqBody)=>{
    return Object.keys(reqBody).length>0

}
const valid=(value)=>{
    if(typeof(value)==='undefined'||value===null)return false
    if(typeof(value)==='string'&& value.trim().length==0)return false
    return true
}

const isValidObjectId = (ObjectId) => {
    return mongoose.Types.ObjectId.isValid(ObjectId);   // to validate a MongoDB ObjectId we are use .isValid() method on ObjectId
};

const isValidPassword = function (value) {
    if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,15}$/.test(value)) { return true }
    else return false
}

let regexSpaceChar = function (attribute) {
    return (/^[A-Za-z\s]{1,}[\,]{0,1}[A-Za-z\s]{0,}$/.test(attribute))
}
let userName = function (username) {
    return (/^[a-z0-9_\.]+$/.test(username))
}

let marks = function (marks) {
    return (/^[0-9]*$/.test(marks))
}


let isREgexName = function (attribute) {
    return (/^[a-zA-Z]{2,20}$/.test(attribute.trim()))
}




module.exports = { isvalidReqBody, valid, isREgexName, isValidObjectId,regexSpaceChar,userName,marks,isValidPassword }