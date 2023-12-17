const  express = require('express') 
const router = express.Router()
const coursesController = require('../controllers/courses.Conroller')
const allowedTo = require('../middleware/allowedTo')


router.get("/",coursesController.GetCourses) 

router.get("/:id",coursesController.GetSingleCourse)

router.post("/",coursesController.AddCourse)

router.patch("/:id",coursesController.UpDateCourse)

router.delete("/:id", allowedTo("ADMIN"),coursesController.DeleteCourse)

module.exports = router
