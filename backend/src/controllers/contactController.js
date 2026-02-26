const { ContactMessage } = require('../models');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
exports.submitMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const contact = await ContactMessage.create({
      name,
      email,
      phone,
      subject,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Message sent successfully'
    });
  } catch (error) {
    console.error('SubmitMessage error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all messages (Admin)
// @route   GET /api/contact
// @access  Private/Admin
exports.getMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.findAll({
      order: [['created_at', 'DESC']]
    });

    res.json({
      success: true,
      messages
    });
  } catch (error) {
    console.error('GetMessages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};