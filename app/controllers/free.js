const {response} = require('express');
const  db  = require('../models/index');

const serverUrl = `${process.env.HOST}`;

const createFree = async (req, res = response) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const {url} = req.body;
    try {
        const count = await db.Link.count({
            where: {
              ip_address: clientIp,
              state: true
            }
          });
        
        const findLink = await db.Link.findOne({
            where: {
                url: url,
                ip_address: clientIp
            }
        });

        if (count > 2) {
            res.status(409).json({
                "message": "You have reached the maximum number of free links",
                "data": []
            })
        }
        else {
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
                    ip_address: clientIp,
                    path:`${serverUrl}/${path}`,
                    state: true
                });
                res.status(201).json({
                    "message": "Link created successfully",
                    "data": [
                        {
                            id : link.id,
                            url: link.url,
                            path: link.path
                        }
                    ]
                });
            }
        }
    } catch (error) {
        res.status(400).json(
           error
        );
    }

}

const getFree = async (req, res = response) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    try {
        const links = await db.Link.findAll({
            where: {
                ip_address: clientIp,
                state: true
            }
        });
        if (links) {
            res.status(200).json({
                "message": "Links retrieved successfully",
                "data" : links
            });
        }
        else {
            res.status(404).json({
                "message": "No free links available",
                "data" : []
            })
        }
        
    } catch (error) {
        res.status(400).json(
           error
        );
    }
}

const updateLink = async (req, res = response) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const {id, state} = req.body;
    try {
        const link = await db.Link.update(
            {
                state
            },
            {
                where: {
                    id,
                    ip_address: clientIp
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

const getStatistics = async (req, res = response) => {
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    if (clientIp) {
        try {
            let countStatistics = []    
            const linksAll =  await db.Link.findAll({
                where: {
                    ip_address: clientIp,
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
    } else {
        res.status(401).json({
            "message": "Not information available"
        })
    }
}

module.exports = {
    createFree,
    getFree,
    updateLink,
    getStatistics
}   