const teacherModel=require("../models/teacherModel")
const validator=require("../validation/validator")
const jwt=require("jsonwebtoken")

const createUser = async function (req, res) {
    try {
          let data = req.body
          if (!validator.isvalidReqBody(data)) return res.status(400).send({ status: false, message: "data in request body is required" });
  
          //name
          if (!data.Name) return res.status(400).send({ status: false, message: "Name is required" });
          if (!validator.regexSpaceChar(data.name)) return res.status(400).send({ status: false, message: " enter Name is in valid format" });
          const checkName = await teacherModel.findOne({ Name: data.Name })
          if (checkName) return res.status(400).send({ status: false, message: `user ${data.Name} already exists` })
          
          //username
          if (!data.UserName) return res.status(400).send({ status: false, message: "Name is required" });
          if (!validator.userName(data.UserName)) return res.status(400).send({ status: false, message: "user name validation failed" });
          const findName = await teacherModel.findOne({ Name: data.findName })
          if (findName) return res.status(400).send({ status: false, message: `user ${data.UserName} already exists` })
  
          //password
          if (!data.Password) return res.status(400).send({ status: false, message: "password is required" });
          if (!validator.isValidPassword(data.Password)) return res.status(400).send({ status: false, message: `Password should be 8 to 15 characters which contain at least one numeric digit, one uppercase and one lowercase letter` })

          const CreatedData = await teacherModel.create(data) 
          return res.status(201).send({ status: true, message: "success", data: CreatedData })
      } 
      catch (err) {
          return res.status(500).send({ status: false, msg: err.message })
      }
  }


  let loginUser= async function (req, res) {
    try {
        let userName = req.body.userName;
        let password = req.body.password;
        console.log(userName,password)
        let data = req.body
        if (!validator.isvalidReqBody(data)) return res.status(400).send({ status: false, message: "data in request body is required" });
        if (!validator.userName(userName)) return res.status(400).send({ status: false, message: "username is required...!" })
        if (!validator.isValidPassword(password)) return res.status(400).send({ status: false, message: "password is required.!" })
     

        let user = await teacherModel.findOne({ UserName: userName, Password: password });
        if (!user) return res.status(400).send({ status: false, msg: "username or the password is not correct", });
        let token = jwt.sign(
            {
                userId:user._id.toString(),
         
            },
            "functionUp-project"  ,{expiresIn:"15min"}
        );
        res.status(201).send({ status: true, data: { token } });
    } catch (err) {
        res.status(500).send({ msg: "Error", msg: err.message })
    }
};


  module.exports={createUser,loginUser}   
  