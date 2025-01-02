const {response} = require('express');
const {generateToken} = require('../utils/jwt');
const  db  = require('../models/index');
const  bcrypt = require('bcryptjs');
const role_default = process.env.ROLE_ID_DEFAULT;

const createUser = async (req, res = response) => {
    const {name, last_name, email, password} = req.body;

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);
    try {
        const user = await db.User.create({
            name,
            last_name,
            email,
            password : passwordHash,
            role_id : role_default
        });
        const {id } = user;
        res.status(201).json({
            "message": "User created successfully",
            "data" : [
                {
                    id,
                    name,
                    last_name,
                    email
                }
            ]
        });
    } catch (error) { 
        res.status(400).json(
           error
        );
    }
}

const loginUser = async (req, res = response) => {
    const {email, password} = req.body;
    try {
        const user = await db.User.findOne({
            where: {
                email
            }
        });
        const isValidPassword = bcrypt.compareSync(password, user.password );
        if (isValidPassword) {
            const token = await generateToken(user.id);
            res.status(200).json({
                "message": "User logged in successfully",
                "data" : [
                    {
                        token
                    }
                ]
            }
            );
        } else {
            res.status(401).json({
                "data": [],
                "message": "User not found or password is incorrect"
            })
        }
    } catch (error) {
        res.status(400).json(
           error
        );
    }
}

const getUser  = async (req, res = response) => {
    const userApplicant = req.userApplicant;
    if (userApplicant){
        try {
            const user = await db.User.findOne({
                where: {
                    id: userApplicant
                }
            });
            res.status(200).json({
                "message": "User information retrieved successfully",
                "data" : [
                    {
                        id: user.id,
                        name: user.name,
                        last_name: user.last_name,
                        email: user.email
                    }
                ]
            }
            );
        } catch (error) {
            res.status(400).json(
               error
            );
        }
    }
    else {
        res.status(401).json({
            "message": "Not information available"
        })
    }   
}

const getStatistics = async (req, res = response) => {
    const userApplicant = req.userApplicant;
    if (userApplicant){
        try {
            let countStatistics = []    
            const linksAll =  await db.Link.findAll({
                where: {
                    user_id: userApplicant,
                    state: true
                }
            });
            for (const element of linksAll) {
                const statistics = await db.Statistics.count({
                    where: {
                        link_id: element.id,
                    },
                });
                const resultJson = {
                    "link_id": element.id,
                    "url": element.url,
                    "path": element.path,
                    "count": statistics
                }
                countStatistics.push(resultJson);
            }
            if (countStatistics.length === 0) {
                res.status(404).json({
                    "message": "No statistics available",
                    "data" : []
                })
            } else {
                res.status(200).json({
                    "message": "Statistics retrieved successfully",
                    "data" : countStatistics
                }
                );
            }
            
        } catch (error) {
            res.status(400).json(
               error
            );
        }
    }
    else {
        res.status(401).json({
            "message": "Not information available"
        })
    }   
}
module.exports = {
    createUser,
    loginUser,
    getUser,
    getStatistics
}

