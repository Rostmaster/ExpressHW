const { Router } = require("express")
const studentController = require("../controllers/students.js")

const router = new Router();

router.get("/api/students", studentController.getStudents);
router.get("/api/students/:studentId", studentController.getStudent);
router.post("/api/students", studentController.createStudent);
router.post("/api/create-students-table", studentController.createStudentsTable);
router.post("/api/init-students-table", studentController.initStudentsTable);
router.put("/api/students/:studentId", studentController.updateStudent);
router.delete("/api/students/:studentId", studentController.deleteStudent);

module.exports = router