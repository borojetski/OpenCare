const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
  userName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String,
  hasPatientProfile: { type:Boolean, required: true, default: false },
  currentPt: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', default: null },
})

// Password hash middleware.
UserSchema.pre('save', async function save() {
  const user = this;
  if (!user.isModified('password')) {
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
});
// To Use:
// await user.save();

// Helper method for validating user's password.
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) {
        reject(err);
      } else {
        resolve(isMatch);
      }
    });
  });
}
// To Use:
// const match = await user.comparePassword(password);

module.exports = mongoose.model('User', UserSchema)