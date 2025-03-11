const User = require("../models/User");

// Allocate a range of students to a counselor
exports.allocateStudentsToCounselor = async (req, res) => {
    try {
        const { studentIdFrom, studentIdTo, teacherEmail } = req.body;

        if (!studentIdFrom || !studentIdTo || !teacherEmail) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Find the teacher (counselor) using the provided email
        const counselor = await User.findOne({ email: teacherEmail, role: "teacher" });
        if (!counselor) {
            return res.status(404).json({ message: "Counselor (Teacher) not found." });
        }

        // Find all students whose roll numbers are within the specified range
        const studentsToAllocate = await User.find({
            role: "student",
            rollNumber: { $gte: studentIdFrom, $lte: studentIdTo },
        });

        if (studentsToAllocate.length === 0) {
            return res.status(404).json({ message: "No students found in the given range." });
        }

        // Assign the counselor to each student
        const studentIds = studentsToAllocate.map((student) => student._id);
        await User.updateMany(
            { _id: { $in: studentIds } },
            { $set: { counselor: counselor._id } }
        );

        // Update the counselor's assigned students list
        counselor.counsellingStudents.push(...studentIds);
        await counselor.save();

        res.status(200).json({
            message: `Successfully allocated ${studentsToAllocate.length} students to ${counselor.name}`,
            allocatedStudents: studentsToAllocate,
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
      "name rollNumber Class email phone parentsName parentsPhone address photo"
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
