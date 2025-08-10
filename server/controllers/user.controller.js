
require('dotenv').config();
const userModel = require('../models/user.model');

const {getProfileModel,patchProfileModel, getArtistsModel,getUserByIdModel, getUserProfilePic}= require('../models/user.model');

exports.getProfileController= async(req,res)=>{
    const userId = req.user.id;
    try{
        const profile =await getProfileModel(userId);
            if (!profile) {
                    return res.status(404).json({ message: 'User not found' });
            }
        res.status(200).json(profile);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}
exports.getUserProfilePicController = async (req, res) => {
  const userId = req.user.id; 

  try {
    const imgData = await getUserProfilePic(userId);
    if (!imgData) {
      return res.status(404).send('Profile picture not found');
    }

    res.set('Content-Type', 'image/png'); 
    res.send(imgData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
};

exports.patchProfileController = async(req,res)=>{
    try {
        const userID = req.user.id;
        if (!userID) {
            return res.status(404).json({ message: 'User not found' });
        }
        const oldUser =await getProfileModel(userID);
        if (!oldUser){
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedData = {
        name: req.body.name ?? oldUser.name,
        username: req.body.username ?? oldUser.username,
        bio: req.body.bio ?? oldUser.bio,
        pp: req.body.pp ?? oldUser.pp,
        };
        const updateUser= await patchProfileModel(userID,updatedData);
        res.status(200).json(updateUser);


    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getArtistsController= async(req,res)=>{
    try {
        const artists = await getArtistsModel();
        res.status(200).json(artists);
    }catch(error){
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getUserByIdController = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await getUserByIdModel(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.searchArtists = async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search term is required'
      });
    }

    const artists = await userModel.searchArtistsModel(q);
    
    res.status(200).json({
      success: true,
      data: artists
    });
  } catch (error) {
    console.error('Artist search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};






exports.getPaginatedArtists = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 9;

    const { artists, total } = await userModel.getPaginatedArtists(page, limit);

    res.status(200).json({
      data: artists,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
