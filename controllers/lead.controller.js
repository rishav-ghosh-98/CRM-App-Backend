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
const validStatuses = [
  "New",
  "Contacted",
  "Qualified",
  "Proposal Sent",
  "Closed",
];
const validPriorities = ["High", "Medium", "Low"];

const createLead = async (req, res) => {
  try {
    const { name, source, salesAgent, status, tags, timeToClose, priority } =
      req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res
        .status(400)
        .json({ error: "Invalid input: 'name' is required." });
    }

    if (
      !source ||
      typeof source !== "string" ||
      !validSources.includes(source)
    ) {
      return res.status(400).json({
        error:
          "Invalid input: 'source' is required and must be one of Website, Referral, Cold Call, Advertisement, Email, Other.",
      });
    }

    if (salesAgent !== undefined && salesAgent !== null && salesAgent !== "") {
      if (
        typeof salesAgent !== "string" ||
        !mongoose.Types.ObjectId.isValid(salesAgent)
      ) {
        return res.status(400).json({
          error: "Invalid input: 'salesAgent' must be a valid ObjectId.",
        });
      }

      const agentExists = await SalesAgent.findById(salesAgent);
      if (!agentExists) {
        return res
          .status(404)
          .json({ error: `Sales agent with ID '${salesAgent}' not found.` });
      }
    }

    if (
      !status ||
      typeof status !== "string" ||
      !validStatuses.includes(status)
    ) {
      return res.status(400).json({
        error:
          "Invalid input: 'status' must be one of New, Contacted, Qualified, Proposal Sent, Closed.",
      });
    }

    const closeTime = Number(timeToClose);
    if (!Number.isInteger(closeTime) || closeTime <= 0) {
      return res.status(400).json({
        error: "Invalid input: 'timeToClose' must be a positive integer.",
      });
    }

    if (
      !priority ||
      typeof priority !== "string" ||
      !validPriorities.includes(priority)
    ) {
      return res.status(400).json({
        error: "Invalid input: 'priority' must be one of High, Medium, Low.",
      });
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

const getAllLeads = async (req, res) => {
  try {
    const { salesAgent, status, source, tags, priority } = req.query;

    const filter = {};

    // Validate salesAgent
    if (salesAgent) {
      if (!mongoose.Types.ObjectId.isValid(salesAgent)) {
        return res.status(400).json({
          error: "Invalid input: 'salesAgent' must be a valid ObjectId.",
        });
      }

      const agentExists = await SalesAgent.findById(salesAgent);

      if (!agentExists) {
        return res.status(404).json({
          error: `Sales agent with ID '${salesAgent}' not found.`,
        });
      }

      filter.salesAgent = salesAgent;
    }

    // Validate status
    if (status) {
      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          error:
            "Invalid input: 'status' must be one of New, Contacted, Qualified, Proposal Sent, Closed.",
        });
      }

      filter.status = status;
    }

    // Validate source
    if (source) {
      if (!validSources.includes(source)) {
        return res.status(400).json({
          error:
            "Invalid input: 'source' must be one of Website, Referral, Cold Call, Advertisement, Email, Other.",
        });
      }

      filter.source = source;
    }

    // Validate priority
    if (priority) {
      if (!validPriorities.includes(priority)) {
        return res.status(400).json({
          error: "Invalid input: 'priority' must be one of High, Medium, Low.",
        });
      }

      filter.priority = priority;
    }

    // Filter by tags
    if (tags) {
      filter.tags = tags;
    }

    const leads = await Lead.find(filter).populate("salesAgent", "name email");

    return res.status(200).json(leads);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch leads.",
    });
  }
};
const updateLead = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid Lead ID.",
      });
    }

    const {
      name,
      source,
      salesAgent,
      status,
      tags,
      timeToClose,
      priority,
    } = req.body;

    // Validate name
    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        error: "Invalid input: 'name' is required.",
      });
    }

    // Validate source
    if (
      !source ||
      typeof source !== "string" ||
      !validSources.includes(source)
    ) {
      return res.status(400).json({
        error:
          "Invalid input: 'source' is required and must be one of Website, Referral, Cold Call, Advertisement, Email, Other.",
      });
    }

    // Validate salesAgent
    if (salesAgent !== undefined && salesAgent !== null && salesAgent !== "") {
      if (
        typeof salesAgent !== "string" ||
        !mongoose.Types.ObjectId.isValid(salesAgent)
      ) {
        return res.status(400).json({
          error: "Invalid input: 'salesAgent' must be a valid ObjectId.",
        });
      }

      const agentExists = await SalesAgent.findById(salesAgent);

      if (!agentExists) {
        return res.status(404).json({
          error: `Sales agent with ID '${salesAgent}' not found.`,
        });
      }
    }

    // Validate status
    if (
      !status ||
      typeof status !== "string" ||
      !validStatuses.includes(status)
    ) {
      return res.status(400).json({
        error:
          "Invalid input: 'status' must be one of New, Contacted, Qualified, Proposal Sent, Closed.",
      });
    }

    // Validate timeToClose
    const closeTime = Number(timeToClose);

    if (!Number.isInteger(closeTime) || closeTime <= 0) {
      return res.status(400).json({
        error: "Invalid input: 'timeToClose' must be a positive integer.",
      });
    }

    // Validate priority
    if (
      !priority ||
      typeof priority !== "string" ||
      !validPriorities.includes(priority)
    ) {
      return res.status(400).json({
        error: "Invalid input: 'priority' must be one of High, Medium, Low.",
      });
    }

    const updatedLead = {
      name: name.trim(),
      source,
      salesAgent,
      status,
      tags: Array.isArray(tags) ? tags : [],
      timeToClose: closeTime,
      priority,
    };

    const lead = await Lead.findByIdAndUpdate(id, updatedLead, {
      new: true,
      runValidators: true,
    }).populate("salesAgent", "name email");

    if (!lead) {
      return res.status(404).json({
        error: `Lead with ID '${id}' not found.`,
      });
    }

    return res.status(200).json(lead);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to update lead.",
    });
  }
};
const deleteLead = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate Lead ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: "Invalid Lead ID.",
      });
    }

    // Delete the lead
    const lead = await Lead.findByIdAndDelete(id);

    // Check if lead exists
    if (!lead) {
      return res.status(404).json({
        error: `Lead with ID '${id}' not found.`,
      });
    }

    return res.status(200).json({
      message: "Lead deleted successfully.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to delete lead.",
    });
  }
};
module.exports = { createLead, getAllLeads, updateLead, deleteLead };
