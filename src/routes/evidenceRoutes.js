import express from "express";
import evidence from "../modals/evidence.js";

const router = express.Router();

// Health check endpoint
router.get("/health", (req, res) => {
  res.status(200).json({ message: "Evidence API is working", timestamp: new Date().toISOString() });
});

router.post("/", async (req, res) => {
  try {
    const newEvidence = new evidence(req.body);
    await newEvidence.save();
    res.status(201).json(newEvidence);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error saving evidence" });
  }
});

router.get("/evidences", async (req, res) => {
  try {
    console.log('Fetching all evidence...');
    const allEvidence = await evidence.find();
    console.log(`Found ${allEvidence.length} evidence items`);
    res.status(200).json(allEvidence);
  } catch (error) {
    console.error('Error fetching evidence:', error);
    res.status(500).json({ message: "Error fetching evidence", error: error.message });
  }
});

router.patch("/evidences/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {
      ...req.body,
      submittedBySiteInchargeOn: new Date()
    };
    
    const updatedEvidence = await evidence.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedEvidence) {
      return res.status(404).json({ message: "Evidence not found" });
    }
    
    res.status(200).json(updatedEvidence);
  } catch (error) {
    console.error('Error updating evidence:', error);
    res.status(500).json({ message: "Error updating evidence", error: error.message });
  }
});

export default router;
