const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_JWT_SEED;

const generateToken = (id) => {
    
    return new Promise((resolve, reject) => {
        const payload = { id };
        
        jwt.sign(
            payload, 
            secret, 
            { expiresIn: '1h' }, 
            (err, token) => {
            console.log(err);
            if (err) {
                reject("Error in generating token");
            }
            resolve(token);
        });
    });
}

module.exports = {
    generateToken
}