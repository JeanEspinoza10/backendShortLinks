const {response} = require('express');
const db  = require('../models/index');

const Role = db.Role;

const createRole = async (req, res = response) => {
    const {name} = req.body;
    const userApplicant = req.userApplicant;
    const user  = await db.User.findOne({
        where: {
            id: userApplicant
        }
    });
    const roleApplicant = user.role_id;
    if (roleApplicant == 1){
        try {
            const role = await Role.create({
                name
            });
            res.status(201).json(role);
        } catch (error) {
            res.status(400).json(
               error
            );
        }
    }
    else {
        res.status(401).json({
            "message": "You are not authorized to perform this action"
        })
    }
}

const updateRole = async (req, res = response) => {
    const {id, state} = req.body;
    const userApplicant = req.userApplicant;
    const user  = await db.User.findOne({
        where: {
            id: userApplicant
        }
    });
    const roleApplicant = user.role_id;
    if (roleApplicant == 1){
        try {
            const role = await Role.update(
                {
                    state
                },
                {
                    where: {
                        id
                    }
                }
            );
            res.status(200).json({
                "message": "Role updated successfully",
                "data" : []
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
            "message": "You are not authorized to perform this action"
        })
    }   
}
module.exports = {
    createRole,
    updateRole
}