const express = require("express");
const router = express.Router();
const functionController = require("../app/controllers/FunctionController");

router.get("/", functionController.getAll);
router.get("/:id", functionController.findById);
router.post("/", functionController.create);
router.put("/:id", functionController.update);
router.delete("/:id", functionController.deleteById);

module.exports = router;
