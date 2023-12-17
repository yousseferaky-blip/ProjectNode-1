require('dotenv').config()
const express = require("express");
const app = express();
const mongoose = require("mongoose");

const URL = process.env.MONGO_URL
mongoose.connect(URL)
.then(() => {
    console.log("Connect Successfully!");
  })
.catch((err) => {
    console.log(err);
});


const cors = require('cors')
app.use(cors());


app.use(express.json());


const CourseRoute = require("./router/course.route");
const AdminRoute = require("./router/admin.route");

app.use('/api/courses',CourseRoute);
app.use('/api/admin', AdminRoute)


app.all('*',(req,res)=>{
    res.status(404).json({status:"error", message:"This resource is Not Available" })
})



const port = process.env.PORT || 4000
app.listen(port,()=>{
    console.log(`Listening On Port ${port}`);
});

