const Patient = require("../models/Patient");
const User = require("../models/User");
// const fs = require('fs');
const { ObjectId } = require("mongodb")

module.exports = {
  getDashboard: async (req, res) => {
    if (!req.user) {
      return res.redirect("/login");
    }
    try {
      const patients = await Patient.find({ userIds: { $in: [req.user.id] } });
      const patient = patients[0];
      res.render("dashboard.ejs", { patients: patients, patient: patient, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getProfile: async (req, res) => {
    if (!req.user) {
      return res.redirect("/login");
    }
    try {
      const user = await User.findById(req.user.id);
      if (!user) { 
        return res.status(401).render("401");
      }
      const patients = await Patient.find({ userIds: { $in: [req.user.id] } });
      const patient = patients[0];
      res.render("profile", { patients: patients, patient: patient, user: req.user });
    } catch (error) {
      console.error(error);
      return res.render("error", { error: error.message });
    }
  },  
  getPatient: async (req, res) => {
    try {
      const patient = await Patient.findById(req.params.id);
      res.render("patient.ejs", { patient: patient, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCsv: async (req, res) => {
    try {
      const people = await Patient.find({ userId: req.params.id });
      
      // csvData will be an array of strings representing the User object and the people objects; each CSV string in the array represents one row in the final file
      const fields = ['name', 'birthday', 'relation', 'gifts'];
      const csvData = [];

      // add header row to the csvData array
      csvData.push(fields.join(','));

      // add each person's data as a new row in the csvData array
      people.forEach((item) => {
        const rowData = fields.map((field) => {
          if (field === 'birthday') {
            return dayjs(item[field]).format('YYYY-MM-DD');
          }
          return item[field];
        });
    
        csvData.push(rowData.join(','));
      });

      // download file name
      const fileName = "friend-list-db.csv";

      // fs method that writes data to file
      fs.writeFileSync(fileName, csvData.join('\n'));

      // sets the response headers for the download
      res.setHeader('Content-Type', 'text/csv'); // informs browser of file type
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`); // informs browser to treat file as attachment rather than displaying it in browser

      // stream file contents to browser as the data is being read from the file
      const fileStream = fs.createReadStream(fileName); // creates a stream to read data from a file
      fileStream.pipe(res); // connects a readable stream to a writable stream

      // deletes temporary file used for streaming the CSV data after the data has been successfully sent as a response; the clean up step
      fileStream.on('end', () => { //event listener emitted when the entire file has been read and streamed
        fs.unlinkSync(fileName); //deletes the temporary file that was created earlier to store the CSV data
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  },
  createPatient: async (req, res) => {
    const validationErrors = [];
    if (!req.body.name) {
      validationErrors.push({ msg: 'Name is required.' });
    }
    if (!req.body.bday) {
      validationErrors.push({ msg: 'Birthday is required.' });
    }
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
    const existingPatient = await Patient.findOne({
      $and: [
        { name: req.body.name },
        { bday: req.body.bday }
      ]
    });
    if (existingPatient) {
      return res.status(400).json({ error: 'A patient with this name and birthday already exists.' });
    }
    try {
      const { name, bday, phoneNbr, insurNbr } = req.body;
      await Patient.create({
        name,
        bday,
        phoneNbr,
        insurNbr,
        userIds: [req.user.id],
        cal: ""
      });
      await User.updateOne({ _id: req.user.id }, { $set: { hasPatientProfile: true } });
      console.log(req.body)
      console.log("Your patient or family member has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(400).json({ error: err.message });
      } else {
        res.status(500).json({ error: 'An error occurred' });
      }
    }
  },
  addCal: async (req, res) => {
    try {
      await Patient.updateOne({ _id: req.params.id }, { $set: { cal: req.body.calInput } });
      console.log("Calendar Updated")
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
    }
  },
  addMed: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            meds: {
              name: req.body.name, 
              dosage: req.body.dosage,
              notes: req.body.notes
            }
          }
        },
        { new: true },
      );
      console.log("Medications Updated")
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
    }
  },
  addShop: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            shopping: req.body.name
          }          
        },
        { new: true },
      );
      console.log("Shopping List Updated")
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
    }
  },
  editUser: async (req, res) => {
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      user.userName = req.body.userName;
      user.email = req.body.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      await user.save();
      req.flash("success", { msg: "Profile updated successfully!" });
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  editPatient: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            name : req.body.name,
            bday : req.body.bday,
            phoneNbr : req.body.phoneNbr,
            insurNbr : req.body.insurNbr,
            cal : req.body.cal,
          },
        }
      );
      console.log("Patient Updated");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  deletePatient: async (req, res) => {
    try {
      // Find patient by id
      let patient = await Patient.findById({ _id: req.params.id });
      
      // Delete patient from db
      await Patient.deleteOne({ _id: req.params.id });
      console.log("Deleted Patient");
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
    }
  },
  deleteAcct: async (req, res) => {
    try {
      // Delete patients from db
      await Patient.deleteMany({ userId: req.params.id });
      console.log("Deleted All User Patients");
      // Delete user from db
      await User.deleteOne({ _id: req.params.id });
      console.log("Deleted User Acct");
      res.redirect("/");
    } catch (err) {
      res.redirect("/dashboard");
    }
  },
};
