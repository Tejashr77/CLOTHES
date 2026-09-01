const Contact = require('../models/Contact');

exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    const contact = await Contact.create({ name, email, subject, message });
    res.status(201).json({ message: 'Message received. We will get back to you soon.', id: contact._id });
  } catch (error) {
    next(error);
  }
};

exports.getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({}).sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

exports.updateContactStatus = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    contact.status = req.body.status;
    await contact.save();
    res.json(contact);
  } catch (error) {
    next(error);
  }
};
