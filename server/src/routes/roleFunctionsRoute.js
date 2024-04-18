const express = require("express");
const router = express.Router();
const rolefunctionController = require("../app/controllers/RoleFunctionController");

router.get("/", rolefunctionController.getAll);
router.post("/register", rolefunctionController.register);
router.post("/deregister", rolefunctionController.deregister);

module.exports = router;
