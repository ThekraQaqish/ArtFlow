const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/auth.middleware');
const likesController = require('../controllers/likes.controller');

router.get('/:id', routeGuard, likesController.getLikesCount);
router.post('/:id', routeGuard, likesController.toggleLike);

module.exports = router;

/**
 * @swagger
 * /api/likes/{id}:
 *   get:
 *     tags: [Likes]
 *     summary: Get like count for artwork
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Artwork ID
 *     responses:
 *       200:
 *         description: Like count
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 likes_count:
 *                   type: integer
 *                   example: 42
 *       404:
 *         description: Artwork not found
 */

/**
 * @swagger
 * /api/likes/{id}:
 *   post:
 *     tags: [Likes]
 *     summary: Toggle like on artwork
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Artwork ID
 *     responses:
 *       200:
 *         description: Like status changed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 action:
 *                   type: string
 *                   enum: [liked, unliked]
 *                 likes_count:
 *                   type: integer
 *       404:
 *         description: Artwork not found
 */