const { Router } = require("express")
const gradeController = require("../controllers/grades.js")

const router = new Router();

//Grades
router.get("/grades", gradeController.getGrades);
router.get("/grades/:gradeId", gradeController.getGrade);
router.post("/grades", gradeController.createGrade);
router.put("/grades/:gradeId", gradeController.updateGrade);
router.patch("/grades/:gradeId", gradeController.updateGrade);
router.delete("/grades/:gradeId", gradeController.deleteGrade);

//Table
// router.get("/grades-table", gradeController.getTable);
router.post("/grades-table-create", gradeController.createTable);
router.post("/grades-table-init", gradeController.initTable);
router.delete("/grades-table-delete", gradeController.deleteTable);


module.exports = router