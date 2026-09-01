const mongoose = require('mongoose');

const bespokeOrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  inspirationImage: { type: String, default: '' },
  measurements: {
    bust: Number,
    waist: Number,
    hips: Number,
    height: Number,
  },
  fabricPreference: { type: String, default: '' },
  colorPreference: { type: String, default: '' },
  additionalNotes: { type: String, default: '' },
  status: { type: String, enum: ['submitted', 'reviewing', 'quoted', 'in_progress', 'completed', 'cancelled'], default: 'submitted' },
  quotedPrice: { type: Number, default: 0 },
  advancePaid: { type: Boolean, default: false },
  advanceAmount: { type: Number, default: 0 },
  finalPaid: { type: Boolean, default: false },
  estimatedDelivery: Date,
  deliveredAt: Date,
  designerNotes: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('BespokeOrder', bespokeOrderSchema);
