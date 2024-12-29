const express = require('express');
const {getPath} = require('../controllers/paths');

const router = express.Router();

router.get(
    '/:pathUrl',
    getPath
)

module.exports = router;