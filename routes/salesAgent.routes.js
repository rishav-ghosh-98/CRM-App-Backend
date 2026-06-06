const express = require("express");
const router = express.Router();
const { createSalesAgent, getSalesAgent } = require("../controllers/salesAgent.controller");

router.post("/", createSalesAgent);
router.get("/", getSalesAgent)

module.exports = router;
