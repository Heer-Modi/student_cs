const User = require("../models/User");

// Allocate a range of students to a counselor
exports.allocateStudentsToCounselor = async (req, res) => {
  try {
    const { studentIdFrom, studentIdTo, teacherEmail } = req.body;

    if (!studentIdFrom || !studentIdTo || !teacherEmail) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Extract year, branch, and number parts
    const extractParts = (rollNumber) => {
      const match = rollNumber.match(/^(\d{2})([a-zA-Z]+)(\d{3})$/);
      if (!match) return null;
      return {
        year: match[1],
        branch: match[2],
        number: parseInt(match[3], 10),
      };
    };

    const fromParts = extractParts(studentIdFrom);
    const toParts = extractParts(studentIdTo);

    if (
      !fromParts ||
      !toParts ||
      fromParts.year !== toParts.year ||
      fromParts.branch !== toParts.branch
    ) {
      return res
        .status(400)
        .json({
          message: "Invalid roll number format or mismatched year/branch.",
        });
    }

    // Find the counselor
    const counselor = await User.findOne({
      email: teacherEmail,
      role: "teacher",
    });
    if (!counselor) {
      return res
        .status(404)
        .json({ message: "Counselor (Teacher) not found." });
    }

    // Find students within the range
    const studentsToAllocate = await User.find({
      role: "student",
      rollNumber: { $regex: `^${fromParts.year}${fromParts.branch}` },
    }).lean();

    // Filter students manually based on numeric sequence
    const filteredStudents = studentsToAllocate.filter((student) => {
      const studentParts = extractParts(student.rollNumber);
      return (
        studentParts &&
        studentParts.number >= fromParts.number &&
        studentParts.number <= toParts.number
      );
    });

    if (filteredStudents.length === 0) {
      return res
        .status(404)
        .json({ message: "No students found in the given range." });
    }

    // Assign the counselor to each student
    const studentIds = filteredStudents.map((student) => student._id);
    await User.updateMany(
      { _id: { $in: studentIds } },
      { $set: { counselor: counselor._id } }
    );

    console.log(filteredStudents);

    // Update the counselor's assigned students list
    counselor.counsellingStudents.push(...studentIds);
    await counselor.save();

    res.status(200).json({
      message: `Successfully allocated ${filteredStudents.length} students to ${counselor.name}`,
      allocatedStudents: filteredStudents,
    });
  } catch (error) {
    console.error("Error allocating students:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Students Allocated to a Teacher
exports.getCounselingStudents = async (req, res) => {
  try {
    const teacherId = req.user.id; // Get logged-in teacher's ID

    // Find students assigned to this teacher
    const students = await User.find({ counselor: teacherId }).select(
      "name rollNumber department email phone parentsName parentsPhone address photo"
    );

    if (!students || students.length === 0) {
      return res.status(404).json({ message: "No students assigned to you." });
    }

    res.status(200).json({ students });
  } catch (error) {
    console.error("Error fetching allocated students:", error);
    res.status(500).json({ message: "Server error" });
  }
};
