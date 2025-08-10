const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/auth.middleware');
const challengeController = require('../controllers/weeklyChallenge.controller');

router.get('/', routeGuard, challengeController.getActiveChallenge);
router.get('/submissions', routeGuard, challengeController.getSubmissions);
router.post('/submissions', routeGuard, challengeController.createSubmission);
router.get('/submissions/:submissionId', routeGuard, challengeController.getSubmission);

module.exports = router;
/**
 * @swagger
 * /api/WeeklyCallenge/submissions:
 *   get:
 *     tags: [Weekly Challenges]
 *     summary: Get all challenge submissions
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of submissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ChallengeSubmission'
 */

/**
 * @swagger
 * /api/WeeklyCallenge/submissions:
 *   post:
 *     tags: [Weekly Challenges]
 *     summary: Submit artwork to challenge
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - image_url
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Submission created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChallengeSubmission'
 */

/**
 * @swagger
 * /api/WeeklyCallenge/submissions/{submissionId}:
 *   get:
 *     tags: [Weekly Challenges]
 *     summary: Get submission by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: submissionId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ChallengeSubmission'
 *       404:
 *         description: Submission not found
 */