const artworkModel = require('../models/artwork.model');

exports.getArtworkController = async (req, res) => {
  try {
    const artwork = await artworkModel.getArtworkByIdModel(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    res.status(200).json(artwork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getAllArtworksController = async (req, res) => {
  try {
    const artworks = await artworkModel.getAllArtworksModel();
    res.status(200).json(artworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createArtworkController = async (req, res) => {
  const { name, description, image_url, category, artwork_date } = req.body;
  
  if (!name || !image_url || !category) {
    return res.status(400).json({ 
      message: 'Name, image URL and category are required' 
    });
  }

  try {
    const newArtwork = await artworkModel.createArtworkModel(
      req.body, 
      req.user.id
    );
    res.status(201).json(newArtwork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getPaginatedArtworks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    const { artworks, total } = await artworkModel.getPaginatedArtworks(page, limit);
    res.status(200).json({
      data: artworks,
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

exports.updateArtwork = async (req, res) => {
  try {
    const updatedArtwork = await artworkModel.updateArtworkModel(
      req.params.id,
      req.body
    );
    res.status(200).json(updatedArtwork);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteArtwork = async (req, res) => {
  try {
    const deleted= await artworkModel.deleteArtworkModel(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    res.status(204).end(); // 204 No Content أكثر دقة للحذف
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getFilterOptions = async (req, res) => {
  try {
    const options = await artworkModel.getAllFilterOptions();
    res.status(200).json({
      success: true,
      filterOptions: {
        categories: options.categories,
        artists: options.artists,
        sortOptions: ['newest', 'oldest', 'popular', 'commented']
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Failed to load filter options'
    });
  }
};
exports.filterArtworks = async (req, res) => {
  try {
    const filters = {
      categories: req.query.categories ? req.query.categories.split(',') : [],
      artist_ids: req.query.artist_ids ? req.query.artist_ids.split(',').map(id => parseInt(id)).filter(id => !isNaN(id)) : [],
      sort: req.query.sort || 'newest',
      min_likes: req.query.min_likes ? parseInt(req.query.min_likes) : null,
      start_date: req.query.start_date,
      end_date: req.query.end_date,
      limit: parseInt(req.query.limit) || 20,
      page: parseInt(req.query.page) || 1
    };

    const artworks = await artworkModel.filterArtworksModel(filters);
    
    res.status(200).json({
      success: true,
      data: artworks,
      pagination: {
        page: filters.page,
        limit: filters.limit
      }
    });
  } catch (error) {
    console.error('Filter error:', error);
    res.status(500).json({ 
      success: false,
      message: 'Server Error' 
    });
  }
};

exports.searchArtworks = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Search term is required'
      });
    }

    const artworks = await artworkModel.searchArtworksModel(q);
    res.status(200).json({
      success: true,
      data: artworks
    });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error'
    });
  }
};

