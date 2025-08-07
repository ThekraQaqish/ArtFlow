const homeModel = require('../models/home.model');

exports.getHomeData = async (req, res) => {
    try {
        const homeData = await homeModel.getHomeData();
        res.status(200).json(homeData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};