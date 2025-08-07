const challengeModel = require('../models/weeklyChallenge.model');

exports.getSubmissions = async (req, res) => {
  try {
    const challenge = await challengeModel.getActiveChallenge();
    if (!challenge) {
      return res.status(404).json({ message: 'No active challenge found' });
    }

    const submissions = await challengeModel.getSubmissions(challenge.id);
    res.json(submissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.createSubmission = async (req, res) => {
  const { title, description, image_url } = req.body;
  
  if (!title || !description || !image_url) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const challenge = await challengeModel.getActiveChallenge();
    if (!challenge) {
      return res.status(404).json({ message: 'No active challenge found' });
    }

    const newSubmission = await challengeModel.createSubmission(
      req.user.id,
      challenge.id,
      { title, description, image_url }
    );
    
    res.status(201).json(newSubmission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.getSubmission = async (req, res) => {
  try {
    const submission = await challengeModel.getSubmissionById(req.params.submissionId);
    if (!submission) {
      return res.status(404).json({ message: 'Submission not found' });
    }
    res.json(submission);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};