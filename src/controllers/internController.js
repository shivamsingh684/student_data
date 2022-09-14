const internModel = require("../models/internModel");
const mongoose = require("mongoose");

// ------------------------------------------   Create Intern   ----------------------------------------------- //
// =============================Create Intern Api==============================

const createIntern = async function (req, res) {
  try {
    const internData = req.body;
    
    const savedInternData =  await internModel.create(internData);
    return res.status(201).send({status:true, message: savedInternData});
  } 
  catch (err) {
    return res.status(500).send({status: false, message: err.message});
  }
};

module.exports.createIntern=createIntern


