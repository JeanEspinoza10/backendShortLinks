const express = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../utils/validate_fields');
const { validarJWT } = require('../utils/validate_jwt');
const { createLink, getLinks, updateLink } = require('../controllers/links');
const router = express.Router();

router.post(
    '/create',[
        check('url','Url is required').not().isEmpty(),
        validarCampos
    ],
    validarJWT,
    createLink
    
)

router.get(
    '/information',
    validarJWT,
    getLinks
)

router.put(
    '/update',[
        check('id','Id is required').not().isEmpty(),
        check('state','State is required').not().isEmpty(),
        validarCampos
    ],
    validarJWT,
    updateLink
)

module.exports = router;