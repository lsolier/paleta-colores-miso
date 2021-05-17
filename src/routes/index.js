const express = require('express');
const router = express.Router();

//routes
router.get('/', (req, res) => {
    res.render('index', { title: 'First Visual Regression Testing'});
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact page'});
});

module.exports = router;