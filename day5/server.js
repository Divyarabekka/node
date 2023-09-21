const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Student = require("./model/Student");
const Mentor= require("./model/Mentor");

const app = express(); 
//mongoose.set('strictQuery', false);

const PORT = 3000;
const DB_URL = "mongodb+srv://rabekka25:raja143divya@cluster1.arajehh.mongodb.net/";

app.use(bodyParser.json()); // For parsing JSON bodies

mongoose
  .connect(DB_URL, {})
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Could not connect to MongoDB", err));


// CREATE Mentor
app.post("/mentor", async (req, res) => {
    try {
      const mentor= new Mentor(req.body);
      await mentor.save();
      res.send(mentor);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // CREATE Student
  app.post("/student", async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      res.send(student);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Assign
  app.post("/mentor/:mentorId/assign", async (req, res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId);
      const students = await Student.find({ _id: { $in: req.body.students } });
      students.forEach((student) => {
        student.cMentor = mentor._id;
        student.save();
      });
      mentor.students = [
        ...mentor.students,
        ...students.map((student) => student._id),
      ];
      await mentor.save();
      res.send(mentor);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  //Assign and change
  app.put("/student/:studentId/assignMentor/:mentorId", async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId);
      const nMentor = await Mentor.findById(req.params.mentorId);
  
      if (student.cMentor) {
        student.pMentor.push(student.cMentor);
      }
  
      student.cMentor = nMentor._id;
      await student.save();
      res.send(student);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // Show all students for a particular mentor
  app.get("/mentor/:mentorId/students", async (req, res) => {
    try {
      const mentor = await Mentor.findById(req.params.mentorId).populate(
        "students"
      );
      res.send(mentor.students);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  
  // show the previously assigned mentor for a particular student.
 app.get("/mentor/:studentId/pre-mentor", async (req, res) => {
    try {
      const student = await Student.findById(req.params.studentId).populate(
        "pMentor"
      );
      res.send(student.pMentor);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  
  app.listen(PORT, () => {
    console.log("Server is running on PORT:", PORT);
  });