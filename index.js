require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { initialiseDatabase } = require("./db/db.connect");
const salesAgentRoutes = require("./routes/salesAgent.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/agent", salesAgentRoutes);

const PORT = process.env.PORT || 5000;

initialiseDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Successfully connected to port", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database", error);
    process.exit(1);
  });
