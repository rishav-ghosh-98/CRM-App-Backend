const SalesAgent = require("../models/salesAgent.models");

const createSalesAgent = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !name.trim()) {
      return res.status(400).json({ error: "Please add sales agent name" });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: "Please add email id" });
    }

    const existingEmail = await SalesAgent.findOne({ email });
    if (existingEmail) {
      return res
        .status(409)
        .json({ error: "Sales agent with this email already exists" });
    }

    const salesAgent = new SalesAgent({
      name: name.trim(),
      email: email.trim(),
    });
    const savedAgent = await salesAgent.save();

    return res.status(201).json({
      id: savedAgent._id,
      name: savedAgent.name,
      email: savedAgent.email,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add sales agent" });
  }
};
const getSalesAgent = async (req, res) => {
  try {
    const agents = await SalesAgent.find();
    const response = agents.map((agent) => ({
      id: agent._id,
      name: agent.name,
      email: agent.email,
    }));

    return res.status(200).json({
      agents: response,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to get agents" });
  }
};
module.exports = { createSalesAgent, getSalesAgent };
