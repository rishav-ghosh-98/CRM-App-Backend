const Lead = require("../models/leads.model");
const getPipeLineReport = async (req, res) => {
  try {
    const totalLeadsInPipeLine = await Lead.countDocuments({
      status: {
        $ne: "Closed",
      },
    });
    return res.status(200).json({ totalLeadsInPipeLine });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch pipeline report.",
    });
  }
};
const getLastWeekReport = async (req, res) => {
  try {
    const now = new Date();
    const lastWeek = new Date(now);
    lastWeek.setDate(lastWeek.getDate() - 7);

    const closedLeads = await Lead.find({
      status: "Closed",
      closedAt: {
        $gte: lastWeek,
        $lte: now,
      },
    })
      .populate("salesAgent", "name")
      .select("name salesAgent closedAt");

    const report = closedLeads.map((lead) => ({
      id: lead._id,
      name: lead.name,
      salesAgent: lead.salesAgent?.name || null,
      closedAt: lead.closedAt,
    }));

    return res.status(200).json(report);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch last week's report.",
    });
  }
};
module.exports = { getPipeLineReport , getLastWeekReport}