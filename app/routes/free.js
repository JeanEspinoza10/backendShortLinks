const express = require('express');
const {check} = require('express-validator');
const { validarCampos } = require('../utils/validate_fields');
const {createFree , getFree , updateLink, getStatistics} = require('../controllers/free');

const router = express.Router();



router.post(
    '/create',[
        check('url','Url is required').not().isEmpty(),
        validarCampos
    ],
    createFree
)

router.get(
    '/information',
    getFree
)

router.put(
    '/update',[
        check('id','Id is required').not().isEmpty(),
        check('state','State is required').not().isEmpty(),
        validarCampos
    ],
    updateLink
)

router.get(
    '/statistics',
    getStatistics
)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: FreeLinks
 *   description: Endpoints for generate free linksshorts.
 */

/**
 * @swagger
 * /api/v1/free/create:
 *   post:
 *     summary: Create a free link
 *     description: Allows a user to create a free shortened link.
 *     tags: [FreeLinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 example: "https://example.com"
 *     responses:
 *       201:
 *         description: Link created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 shortUrl:
 *                   type: string
 *                   example: "https://short.ly/abc123"
 *       400:
 *         description: Invalid input data.
 */

/**
 * @swagger
 * /api/v1/free/information:
 *   get:
 *     summary: Get free links information
 *     description: Retrieves information about all free links.
 *     tags: [FreeLinks]
 *     responses:
 *       200:
 *         description: Free links information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "12345"
 *                   url:
 *                     type: string
 *                     example: "https://example.com"
 *                   shortUrl:
 *                     type: string
 *                     example: "https://short.ly/abc123"
 *                   visits:
 *                     type: integer
 *                     example: 100
 */

/**
 * @swagger
 * /api/v1/free/update:
 *   put:
 *     summary: Update a free link
 *     description: Updates the state of a free shortened link.
 *     tags: [FreeLinks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 example: "12345"
 *               state:
 *                 type: string
 *                 example: "active"
 *     responses:
 *       200:
 *         description: Link updated successfully.
 *       400:
 *         description: Invalid input data.
 */

/**
 * @swagger
 * /api/v1/free/statistics:
 *   get:
 *     summary: Get statistics for free links
 *     description: Retrieves statistics for all free links.
 *     tags: [FreeLinks]
 *     responses:
 *       200:
 *         description: Statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalLinks:
 *                   type: integer
 *                   example: 50
 *                 totalClicks:
 *                   type: integer
 *                   example: 500
 */