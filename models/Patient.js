const mongoose = require('mongoose')
const User = require('./User')

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
  monthNotificationSent: {
    type: Boolean,
    default: false,
  },
  gifts: {
    type: [String],
    default: [],
  },
})

module.exports = mongoose.model('Patient', PatientSchema)