const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/auth.middleware');
const challengeController = require('../controllers/admin.controller');

router.post(
  '/WeeklyChallenge', 
  routeGuard, 
  challengeController.createWeeklyChallenge
);

module.exports = router;

/**
 * @swagger
 * /api/admin/WeeklyChallenge:
 *   post:
 *     tags: [Admin]
 *     summary: Create weekly challenge (Admin only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - start_date
 *               - end_date
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date-time
 *               end_date:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Challenge created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 start_date:
 *                   type: string
 *                   format: date-time
 *                 end_date:
 *                   type: string
 *                   format: date-time
 *       403:
 *         description: Forbidden (not admin)
 */