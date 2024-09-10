const multer = require('multer');
const express = require('express');
const path = require('path');
const router = express.Router();
const fs = require("fs");

const dataFilePath = path.join(__dirname, '../data/tracks.json');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.fieldname === 'music') {
            cb(null, 'data/music');
        } else if (file.fieldname === 'image') {
            cb(null, 'data/images');
        }
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.fields([{ name: 'music', maxCount: 1 }, { name: 'image', maxCount: 1 }]), (req, res) => {
    const { name, autor, genre, secondaryParam, listening_day, listening_week, listening_month } = req.body;
    const musicFile = req.files['music'] ? req.files['music'][0].originalname : null;
    const imageFile = req.files['image'] ? req.files['image'][0].originalname : null;

    const listening = {
        day: listening_day ? parseInt(listening_day, 10) : 0,
        week: listening_week ? parseInt(listening_week, 10) : 0,
        month: listening_month ? parseInt(listening_month, 10) : 0,
    };

    const newTrack = {
        src: musicFile,
        imgSrc: imageFile,
        name,
        autor,
        genre,
        secondaryParam,
        listening
    };

    fs.readFile(dataFilePath, (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Server error');
        }

        let tracks = [];
        try {
            tracks = JSON.parse(data.toString());
        } catch (e) {
            console.error('Error parsing JSON:', e);
            return res.status(500).send('Server error');
        }

        // Adding a new track to the array
        tracks.push(newTrack);

        fs.writeFile(dataFilePath, JSON.stringify(tracks, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).send('Server error');
            }

            console.log('Track uploaded and saved successfully');
            res.status(200).send('Track uploaded successfully');
        });
    });
});

module.exports = router;
