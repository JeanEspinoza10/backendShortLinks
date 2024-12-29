const express = require('express');
const {check} = require('express-validator');
const {createUser, loginUser, getUser, getStatistics} = require('../controllers/users');
const { validarCampos } = require('../utils/validate_fields');
const { validarJWT } = require('../utils/validate_jwt');
const router = express.Router();

router.post(
    '/register',[
        check('name','Name is required').not().isEmpty(),
        check('last_name','Last name is required').not().isEmpty(),
        check('email','Email is required').isEmail(),
        check('password','Password is required').isLength({ min: 10 }),
        validarCampos
    ],
    createUser
)

router.post(
    '/login',[
        check('email','Email is required').isEmail(),
        check('password','Password is required').isLength({ min: 10 }),
        validarCampos
    ],
    loginUser
)

router.get(
    '/information',
    validarJWT,
    getUser
)

router.get(
    '/statistics',
    validarJWT,
    getStatistics
)

module.exports = router;