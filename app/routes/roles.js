const express = require('express');
const {check} = require('express-validator');
const {createRole, updateRole} = require('../controllers/roles');
const { validarCampos } = require('../utils/validate_fields');
const { validarJWT } = require('../utils/validate_jwt');
const router = express.Router();

router.post(
    '/create',[
        check('name','Name is required').not().isEmpty(),
        validarCampos
    ],
    validarJWT,
    createRole
)

router.post(
    '/update',
    [
        check('id','Id is required').not().isEmpty(),
        check('state','State is required').not().isEmpty(),
        validarCampos
    ],
    validarJWT,
    updateRole
)

module.exports = router;