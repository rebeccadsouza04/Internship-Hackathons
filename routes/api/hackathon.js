const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Hackathon = require('../../models/Hackathons');

// @route    GET api/hackathon
// @desc     Get all hackathons
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const hackathons = await Hackathon.find();
        res.json(hackathons);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;