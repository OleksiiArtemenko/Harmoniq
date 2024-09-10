const express = require('express');
const path = require('path');
const router = express.Router();


router.get('/images/:imageName', (req, res) => {
    const imageName = req.params.imageName;
    const imagePath = path.join(__dirname, '../data/images', imageName);
    res.sendFile(imagePath);
});

router.get('/audio/:filename', (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, '../data/music', filename);
    res.sendFile(filePath);
});


router.get('/top-tracks-day', (req, res) => {
    delete require.cache[require.resolve('./../data/tracks.json')];
    const tracks = require('./../data/tracks.json');
    const amountTracks = parseInt(req.query.amountTracks, 10) || 10;

    const topTracks = tracks
        .sort((a, b) => b.listening.day - a.listening.day)
        .slice(0, amountTracks);

    const updatedTracks = topTracks.map(track => ({
        ...track,
        src: `/api/audio/${track.src}`
    }));

    const isLimited = tracks.length <= amountTracks;

    res.json({
        isLimited,
        tracks: updatedTracks
    });
});

router.get('/top-tracks-week', (req, res) => {
    delete require.cache[require.resolve('./../data/tracks.json')];
    const tracks = require('./../data/tracks.json');
    const amountTracks = parseInt(req.query.amountTracks, 10) || 10;

    const topTracks = tracks
        .sort((a, b) => b.listening.week - a.listening.week)
        .slice(0, amountTracks);

    const updatedTracks = topTracks.map(track => ({
        ...track,
        src: `/api/audio/${track.src}`
    }));

    const isLimited = tracks.length <= amountTracks;

    res.json({
        isLimited,
        tracks: updatedTracks
    });
});

router.get('/top-tracks-month', (req, res) => {
    delete require.cache[require.resolve('./../data/tracks.json')];
    const tracks = require('./../data/tracks.json');
    const amountTracks = parseInt(req.query.amountTracks, 10) || 10;

    const topTracks = tracks
        .sort((a, b) => b.listening.month - a.listening.month)
        .slice(0, amountTracks);

    const updatedTracks = topTracks.map(track => ({
        ...track,
        src: `/api/audio/${track.src}`
    }));

    const isLimited = tracks.length <= amountTracks;

    res.json({
        isLimited,
        tracks: updatedTracks
    });
});

router.get('/minimal-tracks', (req, res) => {
    delete require.cache[require.resolve('./../data/tracks.json')];
    const tracks = require('./../data/tracks.json');
    const amountTracks = parseInt(req.query.amountTracks, 10) || 10;

    const minimalTracks = tracks
        .sort((a, b) => a.listening.day - b.listening.day)
        .slice(0, amountTracks);

    const updatedTracks = minimalTracks.map(track => ({
        ...track,
        src: `/api/audio/${track.src}`
    }));

    const isLimited = tracks.length <= amountTracks;

    res.json({
        isLimited,
        tracks: updatedTracks
    });
});

router.get('/last-tracks', (req, res) => {
    delete require.cache[require.resolve('./../data/tracks.json')];
    const tracks = require('./../data/tracks.json');
    const amountTracks = parseInt(req.query.amountTracks, 10) || 10;

    const minimalTracks = tracks.slice(-amountTracks);

    const updatedTracks = minimalTracks.map(track => ({
        ...track,
        src: `/api/audio/${track.src}`
    }));

    const isLimited = tracks.length <= amountTracks;

    res.json({
        isLimited,
        tracks: updatedTracks
    });
});

router.get('/search-tracks', (req, res) => {
    const tracks = require('./../data/tracks.json');
    const searchQuery = req.query.q.toLowerCase();
    const amountTracks = parseInt(req.query.amountTracks, 10) || 10;

    const filteredTracks = tracks.filter(track =>
        track.name.toLowerCase().includes(searchQuery) ||
        track.autor.toLowerCase().includes(searchQuery) ||
        track.genre.toLowerCase().includes(searchQuery) ||
        track.secondaryParam.toLowerCase().includes(searchQuery)
    );

    const updatedTracks = filteredTracks.slice(0, amountTracks).map(track => ({
        ...track,
        src: `/api/audio/${track.src}`
    }));

    const isLimited = filteredTracks.length <= amountTracks;

    res.json({
        isLimited,
        tracks: updatedTracks
    });
});

router.get('/:genreMode', (req, res) => {
    const genreMode = req.params.genreMode;
    const amountTracks = parseInt(req.query.amountTracks, 10) || 10;

    delete require.cache[require.resolve('./../data/tracks.json')];
    const tracks = require('./../data/tracks.json');

    const filteredTracks = tracks.filter(
        track => track.genre === genreMode || track.secondaryParam === genreMode
    );

    const topTracks = filteredTracks
        .sort((a, b) => b.listening.month - a.listening.month)
        .slice(0, amountTracks);

    const updatedTracks = topTracks.map(track => ({
        ...track,
        src: `/api/audio/${track.src}`
    }));

    const isLimited = filteredTracks.length <= amountTracks;

    res.json({
        isLimited,
        tracks: updatedTracks
    });

});

module.exports = router;
