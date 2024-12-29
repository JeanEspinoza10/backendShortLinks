const {response} = require('express');
const  db  = require('../models/index');

const serverUrl = `${process.env.HOST}`;

const createLink = async (req, res = response) => {
    const userApplicant = req.userApplicant;
    const {url} = req.body;
    
    try {
        const findLink = await db.Link.findOne({
            where: {
                url: url,
                user_id: userApplicant,
                state: true
            }
        });
        if (findLink) {
            res.status(409).json({
                "message": "Link already exists",
                "data": [
                    {
                        url: findLink.url,
                        path: findLink.path
                    }
                ]
            })
        }
        else {
            // Create random path
            const timestamp = Date.now().toString(36).substring(0, 4);
            const randomPart = Math.random().toString(36).substring(2, 6); 
            const path = `${timestamp}-${randomPart}`
            
            const link = await db.Link.create({
                url: url,
                path:`${serverUrl}/${path}`,
                user_id : userApplicant
            });
            res.status(201).json({
                "message": "Link created successfully",
                "data": [
                    {
                        url: link.url,
                        path: link.path
                    }
                ]
            });
        }
        
    } catch (error) {
        res.status(400).json(
           error
        );
    }
}

const getLinks = async (req, res = response) => {
    const userApplicant = req.userApplicant;
    try {
        const links = await db.Link.findAll({
            where: {
                user_id: userApplicant,
                state: true
            }
        });
        
        res.status(200).json({
            "message": "Links retrieved successfully",
            "data" : links
        });
    } catch (error) {
        res.status(400).json(
           error
        );
    }
}

const updateLink = async (req, res = response) => {
    const userApplicant = req.userApplicant;
    const {id, state} = req.body;
    try {
        const link = await db.Link.update(
            {
                state
            },
            {
                where: {
                    id,
                    user_id: userApplicant
                }
            }
        );
        if (link[0]) {
            res.status(200).json({
                "message": "Link updated successfully",
                "data" : []
            }
            );
           
        } else {
            res.status(404).json({
                "message": "Link not found",
                "data" : []
            })
        }
        
    } catch (error) {
        res.status(400).json(
           error
        );
    }
}

module.exports = {
    createLink,
    getLinks,
    updateLink
}