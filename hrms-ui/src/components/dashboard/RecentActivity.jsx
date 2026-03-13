import { useEffect, useState } from "react";
import "../../assets/css/style.css";

function RecentActivity({ employees }) {

  const [activities, setActivities] = useState([]);

  useEffect(() => {

    if (!employees || employees.length === 0) {
      setActivities([]);
      return;
    }

    const recent = employees.slice(0, 8).map((emp, index) => ({
      id: index + 1,
      name: emp.name,
      department: emp.department || "Unknown",
      action: "Employee added",
      time: new Date().toLocaleString()
    }));

    setActivities(recent);

  }, [employees]);

  return (
    <div className="card">

      <h3>Recent Activity</h3>

      <div style={{ marginTop: "20px" }}>

        {activities.length === 0 && (
          <div style={{ padding: "15px", color: "#777" }}>
            No recent activity found
          </div>
        )}

        {activities.map((activity) => (

          <div
            key={activity.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "12px 0",
              borderBottom: "1px solid #eee"
            }}
          >

            <div>
              <strong>{activity.name}</strong>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {activity.action} • {activity.department}
              </div>
            </div>

            <div style={{ fontSize: "12px", color: "#999" }}>
              {activity.time}
            </div>

          </div>

        ))}

      </div>

      <div style={{
        marginTop: "15px",
        fontSize: "12px",
        color: "#888"
      }}>
        Shows latest employee activities in the system.
      </div>

    </div>
  );
}

export default RecentActivity;