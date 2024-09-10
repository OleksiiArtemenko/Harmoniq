const express = require('express');
const usersFilePath = './data/users.json';
const SECRET_KEY = 'your_secret_key';
const router = express.Router();
const jwt = require('jsonwebtoken');
const fs = require('fs');

function readUsers() {
    const data = fs.readFileSync(usersFilePath, 'utf-8');
    return JSON.parse(data);
}

function writeUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

router.post('/register', (req, res) => {
    const { email, password } = req.body;

    const users = readUsers();

    const userExists = users.some(user => user.email === email);

    if (userExists) {
        return res.status(400).json({ message: 'Email is already registered' });
    }

    users.push({ email, password });
    writeUsers(users);

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

    res.status(201).json({
        message: 'User successfully registered',
        token
    });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const users = readUsers();

    const user = users.find(user => user.email === email);

    if (user) {
        if (user.password === password) {
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });

            res.status(200).json({ message: 'Successful login', token});
        } else {
            res.status(401).json({ message: 'Incorrect password' });
        }
    } else {
        res.status(201).json({ message: 'User does not exist' });
    }
});

router.post('/validate-token', (req, res) => {
    const token = req.body.token;

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        res.status(200).json({ valid: true, email: decoded.email });
    } catch (error) {
        res.status(401).json({ valid: false });
    }
});

module.exports = router;
