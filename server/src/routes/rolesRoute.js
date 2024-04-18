const express = require("express");
const router = express.Router();
const templateController = require("../app/controllers/TemplateController");

router.get("/", templateController.getAll);
router.get("/:id", templateController.findById);
router.post("/", templateController.create);
router.put("/:id", templateController.update);
router.delete("/:id", templateController.deleteById);

module.exports = router;
