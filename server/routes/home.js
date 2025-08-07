const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/auth.middleware');
const homeController = require('../controllers/home.controller');

router.get('/', routeGuard, homeController.getHomeData);

module.exports = router;

/**
 * @swagger
 * /:
 *   get:
 *     tags: [Home]
 *     summary: Get home page data
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Home page data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 MostPopularArtists:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       pp:
 *                         type: string
 *                       bio:
 *                         type: string
 *                       artworks_count:
 *                         type: integer
 *                 MostPopularArtworks:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       image_url:
 *                         type: string
 *                       category:
 *                         type: string
 *                       artist_name:
 *                         type: string
 */