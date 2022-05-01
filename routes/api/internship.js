const express = require('express');
const router = express.Router();

const Internship = require('../../models/Internships');

// @route    GET api/internship
// @desc     Get all internships
// @access   Private
router.get('/', async (req, res) => {
    try {
        const internships = await Internship.find();
        res.json(internships);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route    GET api/internship/:internship_category
// @desc     Get specific internship
// @access   Public
router.get(
    '/:internship_category',
    async ({ params: { internship_category } }, res) => {
        try {
        const internships = await Internship.find({
            Internship_Category: internship_category
        })
        return res.json(internships);
        } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
    }
);

module.exports = router;