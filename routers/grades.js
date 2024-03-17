const { Router } = require("express")
const gradeController = require("../controllers/grades.js")

const router = new Router();

//Grades
router.get("/api/grades", gradeController.getGrades);
router.get("/api/grades/:gradeId", gradeController.getGrade);
// router.post("/api/grades", gradeController.createGrades);
// router.put("/api/grades/:gradeId", gradeController.updateGrades);
// router.patch("/api/grades/:gradeId", gradeController.updateGrades);
// router.delete("/api/grades/:gradeId", gradeController.deleteGrades);

//Table
// router.get("/api/grades-table", gradeController.getTable);
router.post("/api/grades-table-create", gradeController.createTable);
router.post("/api/grades-table-init", gradeController.initTable);
router.delete("/api/grades-table-delete", gradeController.deleteTable);


module.exports = router