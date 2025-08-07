const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/auth.middleware');
const messagesController = require('../controllers/messages.controller');

router.get('/:id', routeGuard, messagesController.getConversation);
router.post('/', routeGuard, messagesController.sendMessage);
router.get('/', routeGuard, messagesController.getConversationsList);
router.patch('/read/:id', routeGuard, messagesController.markAsRead);
router.delete('/:id', routeGuard, messagesController.deleteMessage);

module.exports = router;

/**
 * @swagger
 * /api/messages:
 *   get:
 *     tags: [Messages]
 *     summary: Get all conversations
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of conversations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   message:
 *                     type: string
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                   other_user_name:
 *                     type: string
 *                   other_user_pp:
 *                     type: string
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   get:
 *     tags: [Messages]
 *     summary: Get conversation with user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Receiver user ID
 *     responses:
 *       200:
 *         description: Conversation messages
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 receiver:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     pp:
 *                       type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       message:
 *                         type: string
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                       is_read:
 *                         type: boolean
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     tags: [Messages]
 *     summary: Send message
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - receiver_id
 *               - message
 *             properties:
 *               receiver_id:
 *                 type: string
 *                 example: "232"
 *               message:
 *                 type: string
 *                 example: "Hello, I love your artwork!"
 *     responses:
 *       201:
 *         description: Message sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 message:
 *                   type: string
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Receiver not found
 */

/**
 * @swagger
 * /api/messages/read/{id}:
 *   patch:
 *     tags: [Messages]
 *     summary: Mark message as read
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Message marked as read
 *       404:
 *         description: Message not found
 */

/**
 * @swagger
 * /api/messages/{id}:
 *   delete:
 *     tags: [Messages]
 *     summary: Delete message
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Message deleted
 *       404:
 *         description: Message not found
 */