const express = require("express");
const router = express.Router();
const roleController = require("../app/controllers/RoleController");

router.get("/", roleController.getAll);
router.get("/:id", roleController.findById);
router.post("/", roleController.create);
router.put("/:id", roleController.update);
router.delete("/:id", roleController.deleteById);

module.exports = router;
