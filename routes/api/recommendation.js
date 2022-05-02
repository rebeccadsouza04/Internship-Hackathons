const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Recommendation = require('../../models/Recommendation');

// @route    GET api/recommendation
// @desc     Get all recommendation
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const recommendations = await Recommendation.find().sort({_id:-1}).limit(5);
        res.json(recommendations);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;