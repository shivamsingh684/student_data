const collegeModel = require('../models/collegeModel');


// ==========================Create College APi===============================
const college = async function (req, res) {

    try {
        const data = req.body;
        const { name, fullName, logoLink } = data;
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, msg: "Data is mandatory" });
        if (!name) return res.status(400).send({ status: false, msg: "College Name is mandatory" });
        if (!fullName) return res.status(400).send({ status: false, msg: "College Full Name is mandatory" });
        if (!logoLink) return res.status(400).send({ status: false, msg: "LogoLink is mandatory" });

        const collegeData = await collegeModel.create(data);
        return res.status(201).send({ status: true, data: collegeData });
    }

    catch (err) {
        return res.status(500).send({ status: false, msg: err.message });
    }
};



// =================================Get-CollegeDetails Api=============================

const getcollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName;
        if (!collegeName) {
               return res.status(400).send({ status: false,   message: "college name is required" });
        }
        const college = await collegeModel.findOne({ name: collegeName, isDeleted: false, });
        if (!college)
            return res.status(400).send({ status: false, message: "No college found" });

        const collegeDetails = {
            name: college.name,
            fullName: college.fullName,
            logoLink: college.logoLink,
        };
        res.status(200).send({ status: true, data: collegeDetails, });


        const getCollegeId = college._id;
        const internData = await internModel.find({ collegeId: getCollegeId, isDeleted: false })
        .select({ name: 1, mobile: 1, email: 1 });
        
        if (internData.length == 0)
            return res.status(400).send({ status: false, message: "No interns for this college" });
        
        const data = { ...collegeDetails, interns: internData };
                   return res.status(200).send({ status: true, data: data });

} catch (error) {
        return res.status(500).send({ status: false, message: err.message });

}
};


// Destructuring
module.exports = {college,getcollegeDetails};
