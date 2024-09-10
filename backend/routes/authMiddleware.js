const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const express = require('express');
const router = express.Router();

router.post('/api/validate-token', (req, res) => {
    const token = req.body.token;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.status(200).json({ valid: true, email: decoded.email });
    } catch (error) {
        res.status(401).json({ valid: false });
    }
});

module.exports = router;