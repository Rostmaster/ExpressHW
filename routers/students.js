const { Router } = require("express")
const studentController = require("../controllers/students.js")

const router = new Router();

//Students
router.get("/api/students", studentController.getStudents);
router.get("/api/students/:studentId", studentController.getStudent);
router.post("/api/students", studentController.createStudent);
router.put("/api/students/:studentId", studentController.updateStudent);
router.patch("/api/students/:studentId", studentController.updateStudent);
router.delete("/api/students/:studentId", studentController.deleteStudent);

//Table
router.post("/api/students/create-table", studentController.createStudentsTable);
router.post("/api/students/init-table", studentController.initStudentsTable);
router.delete("/api/students/delete-table", studentController.deleteStudentsTable);

module.exports = router