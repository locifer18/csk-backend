import mongoose from "mongoose";

const evidenceSchema = new mongoose.Schema({
  title: String,
  project: String,
  unit: String,
  floorUnit: String,
  task: String,
  date: String,
  category: String,
  status: String,
  notes: String,
  images: [
    {
      url: String,
      caption: String,
    },
  ],
});

export default mongoose.model("Evidence", evidenceSchema);
