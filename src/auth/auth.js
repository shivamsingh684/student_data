const jwt = require('jsonwebtoken')
const studentModel = require('../models/studentModel')

const validator = require('../validation/validator')

//------------------⭐Authentication⭐--------------//

let authn = async (req, res, next) => {
  try {
    let token = req.headers['x-api-key']


    if (!token)
      return res.status(404).send({ staus: false, msg: "token is required " })

    jwt.verify(token, "functionUp-project", function (err, decodedtoken) {
      if (err) {
        return res.status(440).send({ status: false, message: "Session expired! Please login again." })
      }
      else {
        req.decoded = decodedtoken
        next()
      }
    })


  } catch (err) {
    res.status(500).send({ message: err.message })
  }
}

//--------------------⭐Authorization⭐--------------------//

let authz = async (req, res, next) => {
  try {

    let loginPerson = req.decoded.userId;

    let userLogging;

    let teacherId = req.query.teacherId

    if (!validator.isValidObjectId(loginPerson)) return res.status(400).send({ status: false, msg: "Enter a valid Id" })
    
    let findData = await studentModel.findOne({ teacherId: teacherId });
    

    if (!findData)
      return res.status(404).send({ status: false, msg: "Error, Please check Id and try again" });

    userLogging = findData.teacherId.toString();

    if (loginPerson !== userLogging)
      return res.status(403).send({ status: false, msg: "Error, authorization failed" });


    next()
  }
  catch (error) {
    res.status(500).send({ status: false, message: error.message })
  }
}


module.exports = { authn, authz }