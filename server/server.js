const express = require("express");
const cors = require("cors");

const db = require("./database/database");
const learnerRoutes = require("./routes/learnerRoutes");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use("/api/learners", learnerRoutes);

// app.get("/", (req, res) => {
//   res.json({ message: "Aaroha backend is running!" });
// });

app.get("/", (req, res) => {
  res.json({ message: "Aaroha backend is running!" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});