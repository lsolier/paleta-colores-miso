const express = require('express');
const router = express.Router();
const CypressService = require('../service/cypress-service');

//routes
router.get('/', (req, res) => {
    res.render('index', { title: 'First Visual Regression Testing'});
});

router.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact page'});
});

router.post('/generate-data', async (req, res) => {
    let dataSet = await CypressService.takeScreenshot();
    console.log(dataSet);
    res.render('generate-data', { 
        title: 'First Visual Regression Testing', 
        dataSet: dataSet
    });
});

module.exports = router;