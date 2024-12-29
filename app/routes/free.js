const express = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../utils/validate_fields');
const {createFree , getFree , updateLink, getStatistics} = require('../controllers/free');

const router = express.Router();

router.post(
    '/create',[
        check('url','Url is required').not().isEmpty(),
        validarCampos
    ],
    createFree
)

router.get(
    '/information',
    getFree
)

router.put(
    '/update',[
        check('id','Id is required').not().isEmpty(),
        check('state','State is required').not().isEmpty(),
        validarCampos
    ],
    updateLink
)

router.get(
    '/statistics',
    getStatistics
)


module.exports = router;