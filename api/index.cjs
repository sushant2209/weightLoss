import express from "express";
import fs from "fs";
import cors from "cors";
import path from "path";
const port = 3000;
const app = express();
app.use(cors());
app.use(express.json());
const path1 = path.resolve(__dirname, "weights.json")
var weightData = JSON.parse(fs.readFileSync(path1, "utf-8"));

app.get("/get_array", (req, res) => {
  res.json(weightData);
});

app.put("/update_weight", (req, res) => {
  const newWeight = req.body.weight;
  for (let i = 2; i < 30; i++) {
    weightData[i - 1] = weightData[i];
  }
  weightData[29] = newWeight;
  fs.writeFileSync(path1, JSON.stringify(weightData));
  res.json({ message: "Weight updated successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
