const express=require('express');
const router = express.Router();



router.use('/auth', require('./auth'));
router.use('/home', require('./home'));
router.use('/users', require('./users'));
router.use('/artworks', require('./artworks'));
router.use('/comments', require('./comments'));
router.use('/likes', require('./likes'));
router.use('/messages', require('./messages'));
router.use('/WeeklyChallenge', require('./WeeklyChallenge'));
router.use('/admin', require('./admin'));
router.use('/contactUs', require('./contactUs'));


module.exports = router;