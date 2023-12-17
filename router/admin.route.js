const  express = require('express') 
const router = express.Router()
const adminController = require('../controllers/admin.Controller')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload')
    },
    filename: function (req, file, cb) {
      const Ext =  file.mimetype.split("/")[1]
      const fileName = `user-${Date.now()}.${Ext}` 
      cb(null, fileName)
    }
  })

const fileFilter = (req, file, cb)=>{
    const imageType = file.mimetype.split("/")[0]
    if(imageType == "image"){
        return  cb(null,true)
    }else{
        const error = new Error('Invalid file type. Only images are allowed.');
        error.status = 400;
        return cb(error, false);
    }
}

const upload = multer({
    storage,
    fileFilter
})

router.get("/", adminController.GetAdmin);
router.post("/register", upload.single('avatar') , adminController.Register);
router.post("/login", adminController.Login);

module.exports = router
