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
// router.get("/api/students-table", studentController.getTable);
router.post("/api/students-table-create", studentController.createTable);
router.post("/api/students-table-init", studentController.initTable);
router.delete("/api/students-table-delete", studentController.deleteTable);

module.exports = router