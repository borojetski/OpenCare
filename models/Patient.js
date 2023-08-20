const mongoose = require('mongoose')
const User = require('./User')

const PatientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bday: {
    type: Date,
    required: false,
  },
  phoneNbr: {
    type: String,
    required: false
  },
  insurNbr: {
    type: String,
    required: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User
  },
})

module.exports = mongoose.model('Patient', PatientSchema)