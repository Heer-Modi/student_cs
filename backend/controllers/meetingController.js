const Meeting = require("../models/meeting");
const User = require("../models/User");

// ✅ Create a new meeting & Notify Allocated Students
exports.createMeeting = async (req, res) => {
  try {
    const { date, time, agenda } = req.body;
    const teacherId = req.user.id;

    // Fetch counseling students assigned to this teacher
    const students = await User.find({
      counselor: teacherId,
      role: "student",
    }).select("_id");

    if (students.length === 0) {
      return res
        .status(404)
        .json({ message: "No allocated students to notify." });
    }

    // Create meeting with attendance records for allocated students
    const meeting = new Meeting({
      teacher: teacherId,
      date,
      time,
      agenda,
      attendance: students.map((student) => ({
        student: student._id,
        status: "Absent",
      })),
    });

    await meeting.save();

    // ✅ Update students to store their meeting notifications
    await User.updateMany(
      { _id: { $in: students.map((s) => s._id) } },
      {
        $push: {
          notifications: {
            message: `New Meeting Scheduled: ${date} at ${time}. Agenda: ${agenda}`,
          },
        },
      }
    );

    res
      .status(201)
      .json({
        message: "Meeting scheduled successfully!",
        meetingId: meeting._id,
      });
  } catch (error) {
    console.error("Error creating meeting:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Fetch Notifications for Student Dashboard
exports.getStudentNotifications = async (req, res) => {
  try {
    const studentId = req.user.id;

    const student = await User.findById(studentId).select("notifications");

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }
    // Optional: Enhance notification structure by parsing date, time, etc.
    const formattedNotifications = student.notifications.map((n) => {
      const match = n.message.match(/New Meeting Scheduled: (.+) at (.+)\. Agenda: (.+)/);
      return match
        ? { date: match[1], time: match[2], agenda: match[3] }
        : { message: n.message };
    });

    res.status(200).json({ notifications: formattedNotifications });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// ✅ Get meeting details & students
exports.getMeetingDetails = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const meeting = await Meeting.findById(meetingId).populate(
      "attendance.student",
      "name rollNumber"
    );

    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    res.status(200).json(meeting);
  } catch (error) {
    console.error("Error fetching meeting details:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Save Attendance
exports.saveAttendance = async (req, res) => {
  try {
    const { meetingId, attendance } = req.body;

    await Meeting.findByIdAndUpdate(meetingId, { attendance });

    res.status(200).json({ message: "Attendance saved successfully!" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Generate Excel Sheet
exports.downloadAttendanceExcel = async (req, res) => {
  try {
    const { meetingId } = req.params;
    const meeting = await Meeting.findById(meetingId).populate(
      "attendance.student",
      "name rollNumber"
    );

    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Attendance");

    worksheet.addRow(["Student ID", "Name", "Status"]);
    meeting.attendance.forEach((entry) =>
      worksheet.addRow([
        entry.student.rollNumber,
        entry.student.name,
        entry.status,
      ])
    );

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=attendance_${meetingId}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating Excel:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getMeetings = async (req, res) => {
  try {
    const teacherId = req.user.id;
    const meetings = await Meeting.find({ teacher: teacherId })
      // .populate("attendance.student", "name rollNumber")
      .sort({ date: -1 }); 

    res.status(200).json(meetings);
  } catch (error) {
    console.error("Error fetching meetings:", error);
    res.status(500).json({ message: "Server error" });
  }
}