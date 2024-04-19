const express = require("express");
const router = express.Router();
const userController = require("../app/controllers/UserController");

router.get("/", userController.getAll);
router.get("/:id", userController.findById);
router.post("/register", userController.register);
router.post("/login", userController.login);
router.put("/:id/updatePasswordById", userController.updatePasswordById);
router.put("/:id/updateRoleById", userController.updateRoleById);
router.put("/:id/updateInfoById", userController.updateInfoById);
router.delete("/:id", userController.deleteById);

module.exports = router;
