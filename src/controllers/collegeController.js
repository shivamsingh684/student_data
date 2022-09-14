























// -------------------Get-CollegeDetails--------------------

const getcollegeDetails = async function (req, res) {
       try{  let collegeName = req.query.collegeName;
          if (!collegeName) {

                    return res.status(400).send({ status: false,  , message: "college name is required" });
          }
          const college = await collegeModel.findOne({ name: collegeName, isDeleted: false, });
          if (!college)
                    return res.status(400).send({ status: false, message: "No college found" });

          // Extracting _id from college & using it to get interns
            const getCollegeId = college._id;    
            const internData = await internModel.find({ collegeId: getCollegeId, isDeleted: false }).select({ name: 1, mobile: 1, email: 1 });








          const collegeDetails = {
                    name: college.name,
                    fullName: college.fullName,
                    logoLink: college.logoLink,
          };
          res.status(200).send({ status: true, data: collegeDetails, });
}catch (error) {
          return res.status(500).send({ status: false, message: err.message });

}
};