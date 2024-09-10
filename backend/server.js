const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 80;

const downloadRoutes = require('./routes/download');
const authRoutes = require('./routes/auth');
const trackRoutes = require('./routes/tracks');
const uploadRoutes = require('./routes/upload');
const validateTokenRoutes = require('./routes/authMiddleware');

app.use(bodyParser.json());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', trackRoutes);
app.use('/api', uploadRoutes);
app.use('/api', downloadRoutes);
app.use('/api', validateTokenRoutes);

app.use(express.static(path.resolve(__dirname, '../frontend/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/dist', 'index.html'));
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => console.log(`Listening on port ${port}`));
