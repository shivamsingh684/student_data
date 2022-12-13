const express = require('express');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(express.json());

mongoose.connect("mongodb+srv://shivamsinghh_684:hFY7Ym3BsbQi0JuT@cluster0.broqahz.mongodb.net/marks", 
{
   useNewUrlParser:true,
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

 
app.use('/', route)
app.use(function(req,re){
  var err = new Error("Not Found.")
  err.status = 404
  return res.status(404).send({ status: "404", msg: "Path not Found." })
})
  

app.listen(3000, function () {
    console.log('Express app running on port ' + (3000))
});      