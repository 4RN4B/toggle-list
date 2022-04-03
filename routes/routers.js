const express = require("express");
const router = express.Router();
const data = require("../client/data/data.json");

// Get all data
router.get("/", (req, res) => {
    try {
        const userData = data;
        res.json(userData);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update one data
router.patch("/:id", (req, res) => {
    const id = req.params.id;
    try {
        const requiredIndex = data.findIndex((element) => {
            return element.id == id;
        });
        if (requiredIndex == -1) {
            res.status(404).json({ message: "Cannot find user" });
        }
        if (req.body.skills != null) {
            data[requiredIndex].skills = req.body.skills;
        }
        res.json({ message: "Updated User" });
        console.log(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete one data
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    try {
        const requiredIndex = data.findIndex((element) => {
            return element.id == id;
        });
        if (requiredIndex == -1) {
            return res.status(404).json({ message: "Cannot find user" });
        }
        data.splice(requiredIndex, 1);
        // res.json(data);
        res.json({ message: "Deleted User" });
        // console.log(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
