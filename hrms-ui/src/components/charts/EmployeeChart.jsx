import { useEffect, useState } from "react";

function EmployeeChart({ employees }) {

  const [departmentStats, setDepartmentStats] = useState([]);
  const [totalEmployees, setTotalEmployees] = useState(0);

  useEffect(() => {

    if (!employees || employees.length === 0) {
      setDepartmentStats([]);
      setTotalEmployees(0);
      return;
    }

    const stats = {};
    let total = 0;

    employees.forEach((emp) => {

      const department = emp.department ? emp.department : "Unknown";

      if (!stats[department]) {
        stats[department] = 0;
      }

      stats[department] += 1;
      total += 1;

    });

    const formattedStats = Object.keys(stats).map((dept) => ({
      department: dept,
      count: stats[dept]
    }));

    setDepartmentStats(formattedStats);
    setTotalEmployees(total);

  }, [employees]);

  return (
    <div className="card">

      <h3>Employee Distribution by Department</h3>

      <p style={{ marginTop: "5px", color: "#666" }}>
        Total Employees: {totalEmployees}
      </p>

      <div style={{ marginTop: "25px" }}>

        {departmentStats.length === 0 && (
          <div style={{ padding: "20px", textAlign: "center" }}>
            No employee data available
          </div>
        )}

        {departmentStats.map((item, index) => {

          const percentage =
            totalEmployees > 0
              ? Math.round((item.count / totalEmployees) * 100)
              : 0;

          return (
            <div
              key={index}
              style={{
                marginBottom: "18px"
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "6px",
                  fontSize: "14px"
                }}
              >
                <span>{item.department}</span>
                <span>
                  {item.count} ({percentage}%)
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  height: "10px",
                  background: "#e5e7eb",
                  borderRadius: "6px",
                  overflow: "hidden"
                }}
              >
                <div
                  style={{
                    width: `${percentage}%`,
                    height: "100%",
                    background: "#4facfe",
                    transition: "width 0.4s ease"
                  }}
                />
              </div>

            </div>
          );
        })}

      </div>

      <div
        style={{
          marginTop: "30px",
          paddingTop: "15px",
          borderTop: "1px solid #eee",
          fontSize: "13px",
          color: "#777"
        }}
      >
        This chart displays how employees are distributed across different
        departments in the organization. It helps HR and administrators quickly
        understand department sizes and workforce distribution.
      </div>

    </div>
  );
}

export default EmployeeChart;