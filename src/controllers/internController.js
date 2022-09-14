const internModel = require("../models/internModel");
const mongoose = require("mongoose");

// ------------------------------------------   Create Intern   ----------------------------------------------- //

const createIntern = async function (req, res) {
  try {
    const internData = req.body;
    // const { name, email, mobile, collegeId } = internData;
    // if(!name){
    //     return res.status(400).send({status:false,message: "Please provide the name"});
    // }
    // if(!email){
    //     return res.status(400).send({status:false, message: "Please provide the email"});
    // }
    // if(!mobile){
    //     return res.status(400).send({status:false, message: "Please provide the mobile no."})
    // }
    // if(!collegeId){
    //     return res.status(400).send({status:false, message: "Please provide the collegeId"})
    // }
    // if(mongoose.Types.ObjectId.isValid(collegeId) === false){
    //     return res.status(401).send({status:false, message: "Wrong collegeId is being provided"})
    // }
    const savedInternData =  await internModel.create(internData);
    return res.status(201).send({status:true, message: savedInternData});
  } catch (err) {
    return res.status(500).send({status: false, message: err.message});
  }
};

module.exports.createIntern=createIntern