const Patient = require("../models/Patient");
const User = require("../models/User");
const {stringify} = require('csv-stringify');
const fs = require('fs');
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
      let patient, birthday;
      if (patients.length > 0) {
        patient = patients[0];
        birthday = patient.bday.toISOString().split('T')[0];
      }
      res.render("profile", { 
        patients: patients, 
        patient: patient, 
        birthday: birthday,  
        user: req.user 
    });
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
      const people = await Patient.find({ userIds: req.params.id });
      const fields = ['name', 'bday', 'allergies', 'dnr', 'phoneNbr', 'insurNbr', 'docs', 'meds', 'care', 'diet', 'shopping'];
      const csvData = [];
      for (const field of fields) {
        people.forEach((item) => {
          if (field === 'bday') {
            const birthday = new Date(item['bday']);
            const formattedBirthday = birthday.toLocaleDateString('en-US', {timeZone: 'UTC', month: '2-digit', day: '2-digit', year: 'numeric'})
            csvData.push({ field: 'bday', value: formattedBirthday });
          } else {
            csvData.push({ field: field, value: item[field] });
          }
        });
      }
      
      stringify(csvData, (err, csvContent) => {
        if (err) {
          console.error(err);
          res.status(500).send('Internal Server Error');
        } else {
          const fileName = "patient-data.csv";
  
          res.setHeader('Content-Type', 'text/csv');
          res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
          res.send(csvContent);
        }
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
      const { name, bday, allergies, dnr, phoneNbr, insurNbr } = req.body;
      await Patient.create({
        name,
        bday,
        allergies,
        dnr,
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
  addDoc: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            docs: {
              name: req.body.name, 
              spec: req.body.spec,
              contact: req.body.contact
            }
          }
        },
        { new: true },
      );
      console.log("Specialty Docs Updated")
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
  addCare: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            care: req.body.name
          }          
        },
        { new: true },
      );
      console.log("Care Notes Updated")
      res.redirect("/dashboard");
    } catch (err) {
      res.redirect("/dashboard");
    }
  },
  addDiet: async (req, res) => {
    try {
      await Patient.findOneAndUpdate(
        { _id: req.params.id },
        {
          $push: {
            diet: req.body.name
          }          
        },
        { new: true },
      );
      console.log("Menu Updated")
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
  deleteDocItem: async (req, res) => {
    const patientId = req.params.id;
    console.log(patientId);
    const itemIndex = req.params.item;
    console.log(itemIndex);
    try {
      const patient = await Patient.findOne({ _id: patientId });
      if (patient) {
        const docs = patient.docs;
        const updatedDocs = [...docs];
        if (itemIndex >= 0 && itemIndex < updatedDocs.length) {
          updatedDocs.splice(itemIndex, 1);
          patient.docs = updatedDocs;
          await patient.save();
        }
      }
      res.redirect("/dashboard");
    } catch (err) {
      console.error(err);
      return res.redirect("/dashboard");
    }
  },
  deleteMedItem: async (req, res) => {
    const patientId = req.params.id;
    console.log(patientId);
    const itemIndex = req.params.item;
    console.log(itemIndex);
    try {
      const patient = await Patient.findOne({ _id: patientId });
      if (patient) {
        const meds = patient.meds;
        const updatedMeds = [...meds];
        if (itemIndex >= 0 && itemIndex < updatedMeds.length) {
          updatedMeds.splice(itemIndex, 1);
          patient.meds = updatedMeds;
          await patient.save();
        }
      }
      res.redirect("/dashboard");
    } catch (err) {
      console.error(err);
      return res.redirect("/dashboard");
    }
  },
  deleteCareItem: async (req, res) => {
    const patientId = req.params.id;
    const itemIndex = req.params.item;
    try {
      const patient = await Patient.findOne({ _id: patientId });
      if (patient) {
        const care = patient.care;
        const updatedCare = [...care];
        if (itemIndex >= 0 && itemIndex < updatedCare.length) {
          updatedCare.splice(itemIndex, 1);
          patient.care = updatedCare;
          await patient.save();
        }
      }
      res.redirect("/dashboard");
    } catch (err) {
      console.error(err);
      return res.redirect("/dashboard");
    }
  },
  deleteDietItem: async (req, res) => {
    const patientId = req.params.id;
    const itemIndex = req.params.item;
    try {
      const patient = await Patient.findOne({ _id: patientId });
      if (patient) {
        const diet = patient.diet;
        const updatedDiet = [...diet];
        if (itemIndex >= 0 && itemIndex < updatedDiet.length) {
          updatedDiet.splice(itemIndex, 1);
          patient.diet = updatedDiet;
          await patient.save();
        }
      }
      res.redirect("/dashboard");
    } catch (err) {
      console.error(err);
      return res.redirect("/dashboard");
    }
  },
  deleteShopItem: async (req, res) => {
    const patientId = req.params.id;
    const itemIndex = req.params.item;
    try {
      const patient = await Patient.findOne({ _id: patientId });
      if (patient) {
        const shopping = patient.shopping;
        const updatedShopping = [...shopping];
        if (itemIndex >= 0 && itemIndex < updatedShopping.length) {
          updatedShopping.splice(itemIndex, 1);
          patient.shopping = updatedShopping;
          await patient.save();
        }
      }
      res.redirect("/dashboard");
    } catch (err) {
      console.error(err);
      return res.redirect("/dashboard");
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
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
      return res.redirect("/profile");
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
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
      return res.redirect("/profile");      
    }
  },
  deletePatient: async (req, res) => {
    try {
      const patient = await Patient.findOne({ userIds: req.params.id });
      if(patient.userIds.length === 1) {
        await Patient.findByIdAndDelete(patient._id); 
        console.log("Deleted patient");
      } else {
        patient.userIds = patient.userIds.filter(userId => userId.toString() !== req.user._id.toString());
        await patient.save();
      }
      const user = await User.findById(req.user._id);
      user.hasPatientProfile = false; 
      await user.save();
      res.redirect("/dashboard");
    } catch (err) {
      console.log(err);
      return res.redirect("/profile");
    }
  },
  deleteAcct: async (req, res) => {
    try {
      const patient = await Patient.findOne({ userIds: req.params.id });
      if (patient.userIds.length === 1) {
        await Patient.deleteMany({ userIds: req.params.id });
        console.log("Deleted patient");
      } else {
        patient.userIds = patient.userIds.filter(userId => userId.toString() !== req.user._id.toString());
        await patient.save();
      }
      await User.deleteOne({ _id: req.params.id });
      console.log("Deleted User Acct");
      res.redirect("/");
    } catch (err) {
      console.log(err);
      return res.redirect("/profile");
    }
  },
};