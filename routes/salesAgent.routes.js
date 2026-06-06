const express = require("express");
const router = express.Router();
const { createSalesAgent } = require("../controllers/salesAgent.controller");

router.post("/", createSalesAgent);

module.exports = router;
