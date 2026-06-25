const express = require("express");
const router = express.Router();
const { getPipeLineReport, getLastWeekReport } = require("../controllers/report.controller")

router.get("/pipeline", getPipeLineReport);
router.get("/last-week", getLastWeekReport);
module.exports = router;