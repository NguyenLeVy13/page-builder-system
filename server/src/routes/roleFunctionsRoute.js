const express = require("express");
const router = express.Router();
const roleFunctionController = require("../app/controllers/RoleFunctionController");

router.get("/", roleFunctionController.getAll);
router.post("/register", roleFunctionController.register);
router.post("/deregister", roleFunctionController.deregister);

module.exports = router;
