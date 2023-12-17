
const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["USER","ADMIN","MANGER"] ,
        default: "USER"
    },
    avatar: {
        type: String,
    }
},{ timestamps: true });


module.exports = mongoose.model("Admin", adminSchema);

