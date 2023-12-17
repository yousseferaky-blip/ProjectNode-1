let Course = require('../models/Mydata')

const GetCourses = async (req,res)=>{ 
    const query = req.query
    const limit = query.limit || 10
    const page = query.page || 1
    const skip = ( page - 1 ) * limit

    const courses = await Course.find({},{__v:false}).limit(limit).skip(skip)
    res.json({status : "success" , data : {courses}})
}

const GetSingleCourse = async (req,res)=>{
    try{
        const course = await Course.findById(req.params.id,{__v:false})
        if(!course){
            
            return res.status(404).json({ status : "fail",  data: {Course: 'Not Found'} })
        }
        res.json({status : "success", data : {course}})
    } catch (err) {
        return res.status(400).json({ status : "error" , data:null, "message" : err.message})
    }
}

const AddCourse = async (req,res)=>{
    const newCourse = new Course(req.body)
    const add = await newCourse.save()
    res.status(201).json({status : "success" , data : {add}})
}

const UpDateCourse = async (req,res)=>{
    try{
        const course = await Course.findByIdAndUpdate(req.params.id,req.body)                                                                                                                                                                                                              
        if(!course){
            return res.status(404).json({ status : "fail",  data: {Course: 'Not Found'} })
        }
        res.json({status : "success" , data : {course}})
    } catch (err) {
        return res.status(400).json({ status : "error" , data:null, "message" : err.message})
    }
}

const DeleteCourse = async (req,res)=>{
    try{
        await  Course.findByIdAndDelete(req.params.id)
        res.json({status : "success", data : null})
    } catch (err) {
        return res.status(400).json({ status : "error" , data:null, "message" : err.message});
    }
}

module.exports = {
    GetCourses , 
    GetSingleCourse,
    AddCourse,
    UpDateCourse,
    DeleteCourse
}
