const express = require("express");
const router = express.Router();
const { createLead,  getAllLeads, updateLead, deleteLead } = require("../controllers/lead.controller");

router.post("/", createLead);
router.get("/", getAllLeads);
router.put("/:id", updateLead)
router.delete("/:id", deleteLead)
module.exports = router;
