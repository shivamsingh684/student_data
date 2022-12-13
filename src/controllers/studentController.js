const studentModel = require("../models/studentModel")
const teacherModel = require("../models/teacherModel")
const validator = require("../validation/validator")

//============create student======================

const createStudent = async function (req, res) {
   try {
        let data = req.query
        let{Name,Subject,Marks,teacherId}=data

        if (!validator.isvalidReqBody(data)) return res.status(400).send({ status: false, message: "data in request body is required" });

        //student
        if (!Name) return res.status(400).send({ status: false, message: "Name is required" });
        if (!validator.regexSpaceChar(data.Name)) return res.status(400).send({ status: false, message: " enter student Name is in valid format" });
        const checkName = await studentModel.findOne({ Name:Name })
        if (checkName) return res.status(400).send({ status: false, message: `student ${Name} already exists` })

        //subject
        if (!Subject) return res.status(400).send({ status: false, message: "subject is required" });
        if (!validator.regexSpaceChar(data.Subject)) return res.status(400).send({ status: false, message: " enter subject is in valid format" });
        const checkSubject = await studentModel.findOne({ Name: Subject })
        if (checkSubject) return res.status(400).send({ status: false, message: `subject ${Subject} already exists` })

        //Marks
        if (!Marks) return res.status(400).send({ status: false, message: "marks is required" });
        if (!validator.marks(Marks)) return res.status(400).send({ status: false, message: " enter marks is in valid format" });

        //teacher
        if (!teacherId) return res.status(400).send({ status: false, message: "teacherId is required" });
        if (!validator.isValidObjectId(teacherId)) return res.status(400).send({ status: false, message: "teacher  validation failed" });
        const findId = await teacherModel.findById({_id:teacherId})
        if (!findId) return res.status(400).send({ status: false, message: `teacher ${teacherId} not found` })

        let savedData = await studentModel.create(data)
        return res.status(201).send({ status: true, message: "Success", data: savedData })

   }
   catch (err) {
       return res.status(500).send({ status: false, err: err.message })
   }

}

//==================get student================

const getStudentData = async (req, res) => {
    try {
        let data = req.query
       
       
        const { Name,Subject } =data
        if (!validator.isvalidReqBody(data)) return res.status(400).send({ status: false, message: "data in request body is required" });

        if(Name){
        if (!validator.regexSpaceChar(Name)) return res.status(400).send({ status: false, message: " enter student Name is in valid format" });
        const checkName = await studentModel.findOne({ Name:Name })
        if (!checkName) return res.status(400).send({ status: false, message: `student ${Name} not found` })
        }
        if(Subject){
            console.log(Subject)
        if (!validator.regexSpaceChar(data.Subject)) return res.status(400).send({ status: false, message: " enter subject is in valid format" });
        const checkSubject = await studentModel.findOne({ Subject: Subject })
        if (!checkSubject) return res.status(400).send({ status: false, message: `subject ${Subject} not found` })
        }
        const allDetails = await studentModel.find(data)
        return res.status(200).send({ status: true, message: "Success", send: allDetails })


    } catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }

}

//----------------------update/Edit data----------------------

const editStudent = async (req, res) => {
    try {   
        
        const data = req.query
        let { Name, Subject, Marks,studentId} = data
        let savedData = await studentModel.findOne({Name:Name}|| {Subject:Subject}||{studentId:studentId})
        console.log(savedData)
        if(savedData.isDeleted==true){
            res.status(200).send({message:"student already deleted"})
        }
        if(savedData){
            let finalMarks=Number(savedData.Marks)+Number(Marks)
            let CreateData=await studentModel.findOneAndUpdate({Name: Name, Subject:Subject},
                {$set: {Marks:Number(finalMarks)}},
                 {new:true,upsert:true})
           res.status(200).send({data:CreateData,message:"marks updated successfully"})
       
        }else{
            let create1 = await studentModel.create(data)
            return  res.status(201).send({status:true, data:create1})
            
        } 
    } catch (err) {
        return res.status(500).send({ status: false, message: err.message})
    }
}



module.exports={createStudent,getStudentData,editStudent} 