const internModel = require("../models/internModel");
const collegeModel = require("../models/collegeModel")
const mongoose = require("mongoose");

// =============================Create Intern Api==============================

const createIntern = async function (req, res) {
  try {
    const internData = req.body;
    const clgId = internData.collegeId
    const clgData = await collegeModel.findById(clgId)
    if(!clgData) {return res.status(404).send({status:false, message: "collegeId not found"});}
    
    const savedInternData =  await internModel.create(internData);
    return res.status(201).send({status:true, data: savedInternData});
  } 
  catch (err) {
    return res.status(500).send({status: false, message: err.message});
  }
};

module.exports.createIntern=createIntern


