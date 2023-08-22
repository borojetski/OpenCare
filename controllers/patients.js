const Patient = require("../models/Patient");
const User = require("../models/User");
// const fs = require('fs');
const { ObjectId } = require("mongodb")

module.exports = {
  getDashboard: async (req, res) => {
    try {
      const patients = await Patient.find({ userIds: { $in: [req.user.id] } });
      res.render("dashboard.ejs", { patients: patients, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },  
  // probably need to comment/delete the below section out
  getFeed: async (req, res) => {
    try {
      const patients = await Patient.find({ userId: req.user.id }).sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { patients: patients, user: req.user });
    } catch (err) {
      console.log(err);
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
    try {
      await Patient.create({
        name: req.body.name,
        bday: req.body.bday,
        phoneNbr: req.body.phoneNbr,
        insurNbr: req.body.insurNbr,
        userIds: [req.user.id],
      });
      await User.updateOne({ _id: req.user.id }, { $set: { hasPatientProfile: true } });
      console.log(req.body)
      console.log("Your patient or family member has been added!");
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
    }
  },
  editPatient: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {name : req.body.name, birthday : req.body.birthday, gifts : req.body.gifts},
        }
      );
      console.log("Patient Updated");
      res.redirect("/dashboard");
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
