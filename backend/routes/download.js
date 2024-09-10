const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/download/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../data/music', filename);

    res.download(filePath, (err) => {
        if (err) {
            console.error('Error downloading file:', err);
            res.status(500).send('File not found');
        }
    });
});

module.exports = router;