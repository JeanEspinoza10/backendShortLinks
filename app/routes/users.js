const express = require('express');
const {check} = require('express-validator');
const {createUser, loginUser, getUser, getStatistics} = require('../controllers/users');
const { validarCampos } = require('../utils/validate_fields');
const { validarJWT } = require('../utils/validate_jwt');
const router = express.Router();

/**
 * @swagger
 * /api/v1/users/register:
 *  post:
 *      description: Users registration in the application
 *      tags:
 *          - Users
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Name of the user
 *                          last_name:
 *                              type: string
 *                              description: Last name of the user
 *                          email:
 *                              type: string
 *                              description: Email of the user
 *                          password:   
 *                              type: string
 *                              description: Password of the user
 *      responses:
 *          201:
 *              description: User created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Message indicating the success of the operation
 *                              data:
 *                                  type: array
 *                                  description: Array of objects containing the user information
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          id:
 *                                              type: integer
 *                                              description: ID of the user
 *                                          name:
 *                                              type: string
 *                                              description: Name of the user
 *                                          last_name:
 *                                              type: string
 *                                              description: Last name of the user
 *                                          email:
 *                                              type: string
 *                                              description: Email of the user
 *          400:
 *              description: Error in the request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Message indicating the error
 *                              data:
 *                                  type: array
 *                                  description: Array of objects containing the error information
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          field:
 *                                              type: string
 *                                              description: Field in which the error occurred
 *                                          message:
 *                                              type: string
 *                                              description: Message indicating the error
 */

/**
 */
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

/**
 * @swagger
 * /api/v1/users/login:
 *   post:
 *     summary: Log in
 *     description: Allows a user to log in.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "securePassword123"
 *     responses:
 *       200:
 *         description: Login successful.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       400:
 *         description: Input data error.
 *       401:
 *         description: Invalid credentials.
 */

router.post(
    '/login',[
        check('email','Email is required').isEmail(),
        check('password','Password is required').isLength({ min: 10 }),
        validarCampos
    ],
    loginUser
)

/**
 * @swagger
 * /api/v1/users/information:
 *   get:
 *     summary: Get user information
 *     description: Returns information about the authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "12345"
 *                 email:
 *                   type: string
 *                   example: "user@example.com"
 *                 name:
 *                   type: string
 *                   example: "John Doe"
 *       401:
 *         description: Unauthorized or invalid token.
 */
router.get(
    '/information',
    validarJWT,
    getUser
)

/**
 * @swagger
 * /api/v1/users/statistics:
 *   get:
 *     summary: Get user statistics
 *     description: Returns statistics related to links created by the authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 linksCreated:
 *                   type: integer
 *                   example: 25
 *                 totalClicks:
 *                   type: integer
 *                   example: 350
 *       401:
 *         description: Unauthorized or invalid token.
 */

router.get(
    '/statistics',
    validarJWT,
    getStatistics
)

module.exports = router;