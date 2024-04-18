const express = require("express");
const router = express.Router();
const roleMenuController = require("../app/controllers/RoleMenuController");

router.get("/", roleMenuController.getAll);
router.post("/register", roleMenuController.register);
router.post("/deregister", roleMenuController.deregister);

module.exports = router;
