const collegeModel = require('../models/collegeModel')

const college = async function (req, res) {
    
    try
    {
        const data = req.body
        const collegeData = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: collegeData })
    }
    
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}

module.exports.college = college



