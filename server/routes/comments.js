const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/auth.middleware');
const commentsController = require('../controllers/comment.controller');

router.get('/:id', routeGuard, commentsController.getComments);
router.post('/:id', routeGuard, commentsController.addComment);

module.exports = router;

/**
 * @swagger
 * /api/comments/{id}:
 *   get:
 *     tags: [Comments]
 *     summary: Get comments for an artwork
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
 *         description: Artwork comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 artwork_name:
 *                   type: string
 *                 comments:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       comment:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       username:
 *                         type: string
 *       404:
 *         description: Artwork not found
 */

/**
 * @swagger
 * /api/comments/{id}:
 *   post:
 *     tags: [Comments]
 *     summary: Add comment to artwork
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Artwork ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *                 example: "This artwork is amazing!"
 *     responses:
 *       201:
 *         description: Comment added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 comment:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Artwork not found
 */