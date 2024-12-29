const {response} = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res  = response, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({
            "ok": false,
            "message": "Token not provided"
        })
    }
    try {
        const { id }  = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.userApplicant = id;
    } catch (error) {
        return res.status(401).json({
            "ok": false,
            "message": "token error"
        })
    }
    next();
}




module.exports = {
    validarJWT
}