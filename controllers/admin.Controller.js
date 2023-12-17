const AdminSchema = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const GetAdmin = async (req,res)=>{
    const query = req.query
    const limit = query.limit || 10
    const page = query.page || 1
    const skip = (page - 1) * limit
    const AllAdmin = await AdminSchema.find({},{__v:false,password:false}).limit(limit).skip(skip)
    res.json({status : "success" , data : {AllAdmin}})
}

const Register = async (req,res)=>{

        const {userName,email,password,role} = req.body
        const existingAdmin  = await AdminSchema.findOne({email})
        if (existingAdmin) {
            return res.status(400).json({ message: "Email already exists"});
        }  

        const HashPassword = bcrypt.hashSync(password,10)
        const newAdmin = new AdminSchema({ 
            userName, 
            email,
            password : HashPassword,
            role,
            avatar: req.file.filename
        })
        await newAdmin.save()
        return res.json({message :"Admin Created Successfully!",data:{newAdmin}})

}

const Login = async (req,res) =>{

    const {email,password} = req.body

    if (!email || !password){
        return res.status(404).json({ message: "Email and Password are required" });
    }

    const user = await AdminSchema.findOne({ email });
    if (user ) {
        const matchedPassword = await bcrypt.compare(password, user.password);

        if(matchedPassword){
            const token  = jwt.sign({id:user._id},process.env.SECRET)
            res.json({token,id:user._id})
        }else{
            return res.status(400).json({ message: "Incorrect Password Or Email" });
        }
        
    }else {
        return res.status(404).json({ message: "Notfound Email Or Password" });
    }

}

module.exports = {
    Register,
    GetAdmin,
    Login
}