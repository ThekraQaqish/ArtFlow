const express = require('express');
const router = express.Router();
const routeGuard = require('../middleware/auth.middleware');
const artworkController = require('../controllers/artworks.controller');
const artworkMiddleware = require('../middleware/artwork.middleware');
router.get('/filter-options', artworkController.getFilterOptions);
router.get('/filter', routeGuard, artworkController.filterArtworks);
router.get('/paginated', routeGuard, artworkController.getPaginatedArtworks);
router.get('/', routeGuard, artworkController.getAllArtworksController);
router.post('/', routeGuard, artworkController.createArtworkController);
router.get('/:id', routeGuard, artworkController.getArtworkController);
router.patch('/:id',routeGuard,artworkMiddleware.checkArtworkOwnership,artworkController.updateArtwork);
router.delete('/:id',routeGuard,artworkMiddleware.checkArtworkOwnership,artworkController.deleteArtwork);
router.get('/search/artworks', artworkController.searchArtworks);
module.exports = router;

/**
 * @swagger
 * /api/artworks:
 *   get:
 *     tags: [Artworks]
 *     summary: Get all artworks
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of artworks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artwork'
 */

/**
 * @swagger
 * /api/artworks/paginated:
 *   get:
 *     tags: [Artworks]
 *     summary: Get paginated artworks
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Paginated artworks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Artwork'
 */

/**
 * @swagger
 * /api/artworks/{id}:
 *   get:
 *     tags: [Artworks]
 *     summary: Get artwork by ID
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
 *         description: Artwork details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artwork'
 *       404:
 *         description: Artwork not found
 */

/**
 * @swagger
 * /api/artworks:
 *   post:
 *     tags: [Artworks]
 *     summary: Create new artwork (Artist only)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *                 format: binary
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Artwork created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artwork'
 *       403:
 *         description: Forbidden (not an artist)
 */

/**
 * @swagger
 * /api/artworks/{id}:
 *   patch:
 *     tags: [Artworks]
 *     summary: Update artwork (Owner only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image_url:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Artwork updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Artwork'
 *       403:
 *         description: Forbidden (not owner)
 */

/**
 * @swagger
 * /api/artworks/{id}:
 *   delete:
 *     tags: [Artworks]
 *     summary: Delete artwork (Owner only)
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
 *         description: Artwork deleted
 *       403:
 *         description: Forbidden (not owner)
 */
/**
 * @swagger
 * /api/artworks/filter-options:
 *   get:
 *     summary: Get all available filter options
 *     responses:
 *       200:
 *         description: Available filter options
 *         content:
 *           application/json:
 *             example:
 *               categories: ["رسم", "نحت", "تصوير"]
 *               artists: [{id: 1, name: "فنان 1"}, {id: 2, name: "فنان 2"}]
 *               sortOptions: ["newest", "oldest", "popular"]
 */
/**
 * @swagger
 * /api/artworks/filter:
 *   get:
 *     tags: [Artworks]
 *     summary: Filter artworks
 *     parameters:
 *       - in: query
 *         name: categories
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: false
 *       - in: query
 *         name: artist_ids
 *         schema:
 *           type: array
 *           items:
 *             type: integer
 *         style: form
 *         explode: false
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [newest, oldest, popular, commented]
 *       - in: query
 *         name: min_likes
 *         schema:
 *           type: integer
 *       - in: query
 *         name: start_date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end_date
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *     responses:
 *       200:
 *         description: Filtered artworks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Artwork'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 */
/**
 * @swagger
 * /api/artworks/search/artworks:
 *   get:
 *     tags: [Artworks]
 *     summary: Search artworks by term
 *     parameters:
 *       - in: query
 *         name: q
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of matching artworks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Artwork'
 */
