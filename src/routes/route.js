const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")
const validation=require("../validation/validation")


router.all("/*", function (req ,res){
          res.status(400).send("Invalid request........!!!")
})
router.post("/functionup/colleges",validation.collegeValidation, collegeController.college)

router.post("/functionup/interns",validation.internValidation, internController.createIntern)

router.get("/functionup/collegeDetails", collegeController.getcollegeDetails)



module.exports = router;