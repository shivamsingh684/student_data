const express = require('express');
const router = express.Router();
const {createUser,loginUser}=require("../controllers/teacherController")
const{createStudent,getStudentData,editStudent}=require("../controllers/studentController")
const{authn,authz}=require("../auth/auth")


//teacher
router.post("/register",createUser)
router.post("/login",loginUser)

//student
router.post("/addStudent",createStudent)
router.get("/getstudent",authn,getStudentData)
router.put("/updateDetails/:teacherId",authn,authz,editStudent)


router.all("/*", function (req ,res){
          res.status(400).send("Invalid request........!!!")
})

module.exports = router;