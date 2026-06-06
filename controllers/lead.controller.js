const mongoose = require("mongoose");
const Lead = require("../models/leads.model");
const SalesAgent = require("../models/salesAgent.models");

const validSources = [
  "Website",
  "Referral",
  "Cold Call",
  "Advertisement",
  "Email",
  "Other",
];
const validStatuses = ["New", "Contacted", "Qualified", "Proposal Sent", "Closed"];
const validPriorities = ["High", "Medium", "Low"];

const createLead = async (req, res) => {
  try {
    const { name, source, salesAgent, status, tags, timeToClose, priority } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Invalid input: 'name' is required." });
    }

    if (!source || typeof source !== "string" || !validSources.includes(source)) {
      return res.status(400).json({ error: "Invalid input: 'source' is required and must be one of Website, Referral, Cold Call, Advertisement, Email, Other." });
    }

    if (salesAgent !== undefined && salesAgent !== null && salesAgent !== "") {
      if (typeof salesAgent !== "string" || !mongoose.Types.ObjectId.isValid(salesAgent)) {
        return res.status(400).json({ error: "Invalid input: 'salesAgent' must be a valid ObjectId." });
      }

      const agentExists = await SalesAgent.findById(salesAgent);
      if (!agentExists) {
        return res.status(404).json({ error: `Sales agent with ID '${salesAgent}' not found.` });
      }
    }

    if (!status || typeof status !== "string" || !validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid input: 'status' must be one of New, Contacted, Qualified, Proposal Sent, Closed." });
    }

    const closeTime = Number(timeToClose);
    if (!Number.isInteger(closeTime) || closeTime <= 0) {
      return res.status(400).json({ error: "Invalid input: 'timeToClose' must be a positive integer." });
    }

    if (!priority || typeof priority !== "string" || !validPriorities.includes(priority)) {
      return res.status(400).json({ error: "Invalid input: 'priority' must be one of High, Medium, Low." });
    }

    const leadData = {
      name: name.trim(),
      source,
      status,
      tags: Array.isArray(tags) ? tags : [],
      timeToClose: closeTime,
      priority,
    };

    if (salesAgent !== undefined && salesAgent !== null && salesAgent !== "") {
      leadData.salesAgent = salesAgent;
    }

    const lead = new Lead(leadData);

    const savedLead = await lead.save();
    return res.status(201).json(savedLead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to create lead" });
  }
};

module.exports = { createLead };
