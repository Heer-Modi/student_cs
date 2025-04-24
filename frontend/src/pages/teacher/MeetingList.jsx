import axios from "axios";
import { useEffect, useState } from "react";

const MeetingList = () => {
    const [meetings, setMeetings] = useState([])

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios
          .get(`/api/meetings/`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => setMeetings(res.data));
        
          console.log("Meetings fetched successfully:", meetings);
      }, []);

    const handleMeetingNavigation = (meetingId) => {
        // Navigate to the meeting details page with the meeting ID
        window.location.href = `/teacher/meeting-attendance/${meetingId}`;
    }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh", backgroundColor: "#f0f0f0", padding: "20px", marginTop: "50px" }}>
      <div style={{ margin: "20px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>Meeting List</h1>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Agenda</th>
              {/* <th style={{ padding: "10px", border: "1px solid #ddd" }}>Meeting ID</th> */}
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Date</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Time</th>
            </tr>
          </thead>
          <tbody>
            {meetings.map((meeting) => (
              <tr key={meeting._id} style={{ backgroundColor: "#fff" }} onClick={() => handleMeetingNavigation(meeting._id)}> 
                {/* <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meeting._id}</td> */}
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meeting.agenda}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meeting.date}</td>
                <td style={{ padding: "10px", border: "1px solid #ddd" }}>{meeting.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MeetingList
