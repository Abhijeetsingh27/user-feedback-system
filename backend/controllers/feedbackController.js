const Feedback = require('../models/Feedback');

// POST /feedback
exports.submitFeedback = async (req, res) => {
  try {
    const { userName, email, feedbackText, category } = req.body;
    const feedback = new Feedback({ userName, email, feedbackText, category });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback.' });
  }
};

// GET /feedback
exports.getFeedback = async (req, res) => {
  try {
    const { sortBy = 'timestamp', order = 'desc', category } = req.query;
    const filter = category ? { category } : {};
    const feedbacks = await Feedback.find(filter).sort({ [sortBy]: order === 'asc' ? 1 : -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch feedback.' });
  }
};

// DELETE /feedback/:id
exports.deleteFeedback = async (req, res) => {
  try {
    const { id } = req.params;
    await Feedback.findByIdAndDelete(id);
    res.json({ message: 'Feedback deleted.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete feedback.' });
  }
};

// PATCH /feedback/:id/read
exports.markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const feedback = await Feedback.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!feedback) return res.status(404).json({ error: 'Feedback not found.' });
    res.json({ message: 'Feedback marked as read.', feedback });
  } catch (error) {
    res.status(500).json({ error: 'Failed to mark as read.' });
  }
}; 