const express = require("express");
const fs = require("fs");
const router = express.Router();

const readFileFunc = () => {
    const fileData = JSON.parse(fs.readFileSync("./client/data/data.json"));
    return fileData;
};
const newData = readFileFunc();

const writeFileFunc = (newData) => {
    let rawData = JSON.stringify(newData, null, 2);
    fs.writeFile("./client/data/data.json", rawData, (err) => {
        if (err) {
            console.log(err);
            return;
        }
    });
};

// Get all data
router.get("/", (req, res) => {
    try {
        console.log("new user data:", newData);
        res.json(newData);
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
            newData[requiredIndex].skills = req.body.skills;
        }
        writeFileFunc(newData);
        res.json({ message: "Updated User" });
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
        newData.splice(requiredIndex, 1);
        writeFileFunc(newData);
        res.json({ message: "Deleted User" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
