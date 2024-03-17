const { Router } = require("express")
const tableToolsController = require("../controllers/tableTools.js")

const router = new Router();

router.get("/api/tables", tableToolsController.getTables);
router.post("/api/tables-create/", tableToolsController.createTable);
router.post("/api/tables-init/", tableToolsController.initTable);
router.delete("/api/tables-delete/", tableToolsController.deleteTable);

module.exports = router