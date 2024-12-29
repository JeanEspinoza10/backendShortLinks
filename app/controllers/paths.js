const {response} = require('express');
const  db  = require('../models/index');

const serverUrl = `${process.env.HOST}`;

const getPath = async (req, res = response) => {
    const {pathUrl} = req.params;
    const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    try {
        const link = await db.Link.findOne({
            where: {
                path: `${serverUrl}/${pathUrl}`
            }
        });
        if (link) {
            const statistics =  await db.Statistics.create(
                {
                    ip_applicant: clientIp,
                    link_id: link.id,
                    browser: req.headers['user-agent']
                }
            )
           return res.redirect(link.url);
        } else {
            res.status(404).json({
                "message": "Path not found",
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
    getPath
}