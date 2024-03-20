const { Router } = require("express")
const studentController = require("../controllers/students.js")

const router = new Router();

//Students
router.get("/students", studentController.getStudents);
router.get("/students/:studentId", studentController.getStudent);
router.post("/students", studentController.createStudent);
router.put("/students/:studentId", studentController.updateStudent);
router.patch("/students/:studentId", studentController.updateStudent);
router.delete("/students/:studentId", studentController.deleteStudent);

//Table
// router.get("/students-table", studentController.getTable);
router.post("/students-table-create", studentController.createTable);
router.post("/students-table-init", studentController.initTable);
router.delete("/students-table-delete", studentController.deleteTable);

module.exports = router