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
    const lastWeek = new Date();

    lastWeek.setDate(lastWeek.getDate() - 7);

    const closedLeads = await Lead.find({
      status: "Closed",
      closedAt: {
        $gte: lastWeek,
      },
    })
      .populate("salesAgent", "name")
      .select("name salesAgent closedAt");

    return res.status(200).json(closedLeads);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: "Failed to fetch last week's report.",
    });
  }
};
module.exports = { getPipeLineReport , getLastWeekReport}