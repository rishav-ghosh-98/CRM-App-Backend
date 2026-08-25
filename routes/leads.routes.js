const express = require("express");
const router = express.Router();
const {
	createLead,
	getAllLeads,
	updateLead,
	deleteLead,
	getLeadById,
	addComment,
	getComments,
} = require("../controllers/lead.controller");

router.post("/", createLead);
router.get("/", getAllLeads);
router.put("/:id", updateLead)
router.delete("/:id", deleteLead)
router.post("/:id/comments", addComment);
router.get("/:id/comments", getComments);
router.get("/:id", getLeadById);
module.exports = router;
