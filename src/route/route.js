const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")

router.post("/functionup/colleges", collegeController.college)

// router.post("/functionup/interns", internController.intern)

<<<<<<< HEAD
router.get("/functionup/collegeDetails", collegeController.getcollegeDetails)
=======
// router.get("/functionup/collegeDetails", collegeController.collegeDetails)
>>>>>>> 287c0aca2aa0f530a6a084325761093434a89d26


module.exports = router;