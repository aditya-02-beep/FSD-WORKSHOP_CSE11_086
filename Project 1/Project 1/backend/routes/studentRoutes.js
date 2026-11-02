const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '..', 'student.json');

const readStudents = async () => {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    if (err.code === 'ENOENT') {
      await fs.writeFile(DATA_FILE, JSON.stringify([], null, 2), 'utf8');
      return [];
    }
    throw err;
  }
};

const writeStudents = async (students) => {
  await fs.writeFile(DATA_FILE, JSON.stringify(students, null, 2), 'utf8');
};

const validateStudent = (data, students, isUpdate = false) => {
  const { id, name, email, branch, semester, mobile } = data;

  if (!isUpdate) {
    if (!id || isNaN(Number(id))) return "Student ID is required and must be a number.";
    const existing = students.find((s) => s.id === Number(id));
    if (existing) return "Student ID already exists. ID must be unique.";
  }

  if (!name || name.trim() === "") return "Name is required.";

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) return "A valid email address is required.";

  const validBranches = ["CSE", "CS", "IT", "ECE"];
  if (!branch || !validBranches.includes(branch)) return "Branch must be one of: CSE, CS, IT, ECE.";

  const semNum = Number(semester);
  if (!semester || isNaN(semNum) || semNum < 1 || semNum > 8) return "Semester must be a number between 1 and 8.";

  const mobileStr = String(mobile || "").trim();
  if (!/^\d{10}$/.test(mobileStr)) return "Mobile number must be exactly 10 digits.";

  return null;
};

router.get('/', async (req, res) => {
  try {
    const students = await readStudents();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: "Error reading student data." });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const students = await readStudents();
    const id = Number(req.params.id);
    const student = students.find((s) => s.id === id);
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: "Error reading student record." });
  }
});

router.post('/', async (req, res) => {
  try {
    const students = await readStudents();
    const error = validateStudent(req.body, students);
    if (error) {
      return res.status(400).json({ message: error });
    }

    const newStudent = {
      id: Number(req.body.id),
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      branch: req.body.branch,
      semester: Number(req.body.semester),
      mobile: String(req.body.mobile).trim()
    };

    students.push(newStudent);
    await writeStudents(students);
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (err) {
    res.status(500).json({ message: "Error saving student data." });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const students = await readStudents();
    const id = Number(req.params.id);
    const studentIndex = students.findIndex((s) => s.id === id);

    if (studentIndex === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    const error = validateStudent(req.body, students, true);
    if (error) {
      return res.status(400).json({ message: error });
    }

    students[studentIndex] = {
      id: id,
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      branch: req.body.branch,
      semester: Number(req.body.semester),
      mobile: String(req.body.mobile).trim()
    };

    await writeStudents(students);
    res.status(200).json({ message: "Student updated successfully", student: students[studentIndex] });
  } catch (err) {
    res.status(500).json({ message: "Error updating student data." });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const students = await readStudents();
    const id = Number(req.params.id);
    const studentIndex = students.findIndex((s) => s.id === id);

    if (studentIndex === -1) {
      return res.status(404).json({ message: "Student not found" });
    }

    const deletedStudent = students.splice(studentIndex, 1)[0];
    await writeStudents(students);
    res.status(200).json({ message: "Student deleted successfully", student: deletedStudent });
  } catch (err) {
    res.status(500).json({ message: "Error deleting student." });
  }
});

module.exports = router;
