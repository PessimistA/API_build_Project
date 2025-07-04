const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticate');

router.get('/', authenticateToken, (req, res) => {
    // real code
    const temperature = 24.5; 
    res.json({ temperature });
});

module.exports = router;
