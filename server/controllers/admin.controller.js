const challengeModel = require('../models/admin.model');

exports.createWeeklyChallenge = async (req, res) => {
  try {
    // التحقق من صلاحية الأدمن
    if (req.user.role !== 'admin') {
      return res.status(401).json({ 
        message: 'You are not authorized to perform this action' 
      });
    }

    const { title, description, start_date, end_date } = req.body;

    // التحقق من البيانات المطلوبة
    if (!title || !description || !start_date || !end_date) {
      return res.status(400).json({ 
        message: 'All fields are required' 
      });
    }

    // التحقق من صحة التواريخ
    const now = new Date();
    const start = new Date(start_date);
    const end = new Date(end_date);

    if (start > end) {
      return res.status(400).json({ 
        message: 'Start date must be before end date' 
      });
    }

    if (end < now) {
      return res.status(400).json({ 
        message: 'End date must be in the future' 
      });
    }

    // إنشاء التحدي
    const newChallenge = await challengeModel.createWeeklyChallenge({
      title,
      description,
      start_date,
      end_date
    });

    res.status(201).json(newChallenge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server Error' 
    });
  }
};