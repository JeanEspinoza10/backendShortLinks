const express = require('express');
const {getPath} = require('../controllers/paths');

const router = express.Router();

router.get(
    '/:pathUrl',
    getPath
)

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Paths
 *   description: Endpoint for redirect to the original URL.
 */

/**
 * @swagger
 * /{pathUrl}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Retrieves the original URL associated with the shortened path and redirects to it.
 *     tags: [Paths]
 *     parameters:
 *       - in: path
 *         name: pathUrl
 *         required: true
 *         description: The unique path of the shortened URL.
 *         schema:
 *           type: string
 *           example: "abc123"
 *     responses:
 *       302:
 *         description: Redirects to the original URL.
 *       404:
 *         description: Shortened URL not found.
 *       500:
 *         description: Server error.
 */