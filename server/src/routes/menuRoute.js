const express = require("express");
const router = express.Router();
const menuController = require("../app/controllers/MenuController");

router.get("/", menuController.getAll);
router.get("/:id", menuController.findById);
router.post("/", menuController.create);
router.put("/:id", menuController.update);
router.delete("/:id", menuController.deleteById);

module.exports = router;
