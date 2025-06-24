const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/', feedbackController.submitFeedback);
router.get('/', feedbackController.getFeedback);
router.delete('/:id', feedbackController.deleteFeedback);
router.patch('/:id/read', feedbackController.markAsRead);

module.exports = router; 