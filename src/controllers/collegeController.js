const collegeModel = require('../models/collegeModel')

const college = async function (req, res) {
    
    try
    {
        const data = req.body
        const { name, fullName, logoLink} = data
        
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is mandatory" })

        if (!name) return res.status(400).send({ status: false, msg: "College Name is mandatory" })
        
        if (!fullName) return res.status(400).send({ status: false, msg: "College Full Name is mandatory" })

        if (!logoLink) return res.status(400).send({ status: false, msg: "LogoLink is mandatory" })
       
        const collegeData = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: collegeData })
    }
    
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.college = college



