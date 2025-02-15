const classes = []; // Mock database for classes
const students = []; // Mock database for students

// Create a new class
exports.createClass = (req, res) => {
  const { className } = req.body;
  if (!className) {
    return res.status(400).json({ message: "Class name is required." });
  }
  if (classes.includes(className)) {
    return res.status(400).json({ message: "Class already exists." });
  }
  classes.push(className);
  res.status(201).json({ message: "Class created successfully." });
};

// Add a student to a class
exports.addStudent = (req, res) => {
  const { name, id, className } = req.body;
  if (!name || !id || !className) {
    return res.status(400).json({ message: "All fields are required." });
  }
  if (!classes.includes(className)) {
    return res.status(404).json({ message: "Class not found." });
  }
  students.push({ name, id, className });
  res.status(201).json({ message: "Student added successfully." });
};

// Allocate a teacher to students in a class
exports.allocateTeacher = (req, res) => {
  const { className, teacher } = req.body;
  if (!className || !teacher) {
    return res.status(400).json({ message: "Class and teacher are required." });
  }
  students.forEach((student) => {
    if (student.className === className) {
      student.teacher = teacher;
    }
  });
  res.status(200).json({ message: "Teacher allocated successfully." });
};

// Get all students
exports.getStudents = (req, res) => {
  res.status(200).json({ students });
};
