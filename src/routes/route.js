const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")
const validation=require("../validation/validation")

router.post("/functionup/colleges",validation.collegeValidation, collegeController.college)

// router.post("/functionup/interns", internController.intern)

// router.get("/functionup/collegeDetails", collegeController.collegeDetails)


module.exports = router;