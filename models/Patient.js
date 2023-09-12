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
  allergies: {
    type: String,
    required: false
  },
  dnr: {
    type: String,
    required: false
  },
  phoneNbr: {
    type: String,
    required: false
  },
  insurNbr: {
    type: String,
    required: false
  },
  userIds: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: User,
  }],
  cal: {
    type: String,
    required: false
  },
  meds: [{
    type: [
      {
        name: String,
        dosage: String,
        notes: String  
      }
    ],
    default: []
  }],
  care: [{
    type: String,
    required: false,
    default: [],
}],
diet: [{
  type: String,
  required: false,
  default: [],
}],
  shopping: [{
    type: String,
    required: false,
    default: [],
}],
})

module.exports = mongoose.model('Patient', PatientSchema)