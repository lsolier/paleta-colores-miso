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
    let data = await CypressService.takeScreenshot();
    console.log(data);
    res.render('generate-data', { 
        title: 'First Visual Regression Testing', 
        resultInfo : data.get('resultInfo'), 
        datetime: data.get('datetime'), 
        beforeImg: data.get('before-img'), 
        afterImg: data.get('after-img'), 
        compareImg: data.get('compare-img')
    });
});

module.exports = router;