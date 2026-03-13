import { useEffect, useState } from "react";
import "../assets/css/style.css";
import API from "../services/api";

function Audit(){

  const [logs,setLogs] = useState([]);
  const [search,setSearch] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);

  useEffect(()=>{
    loadLogs();
  },[]);

  const loadLogs = async () => {

    setLoading(true);

    try{

      const response = await API.get("/audit");

      setLogs(response.data);

    }catch(err){

      setError("Failed to load audit logs");

    }

    setLoading(false);

  };

  const filteredLogs = logs.filter((log)=>
    log.action?.toLowerCase().includes(search.toLowerCase()) ||
    log.module?.toLowerCase().includes(search.toLowerCase()) ||
    log.userEmail?.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {

    const headers = ["ID","User","Action","Module","Timestamp"];

    const rows = logs.map(l=>[
      l.id,
      l.userEmail,
      l.action,
      l.module,
      l.timestamp
    ]);

    let csv = headers.join(",") + "\n";

    rows.forEach(r=>{
      csv += r.join(",") + "\n";
    });

    const blob = new Blob([csv],{type:"text/csv"});

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "audit_logs.csv";

    a.click();

  };

  return(

    <div className="page-container">

      <h1 className="page-title">Audit Logs</h1>

      <div className="form-container">

        <input
          type="text"
          placeholder="Search activity..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

        <button onClick={loadLogs}>
          Refresh
        </button>

        <button onClick={exportCSV}>
          Export CSV
        </button>

      </div>

      {loading && <p>Loading logs...</p>}

      {error && <p className="error">{error}</p>}

      <div className="table-container">

        <table className="data-table">

          <thead>

            <tr>

              <th>ID</th>
              <th>User</th>
              <th>Action</th>
              <th>Module</th>
              <th>Timestamp</th>

            </tr>

          </thead>

          <tbody>

            {filteredLogs.length === 0 ? (

              <tr>
                <td colSpan="5">No logs found</td>
              </tr>

            ) : (

              filteredLogs.map((log)=>(
                <tr key={log.id}>

                  <td>{log.id}</td>
                  <td>{log.userEmail}</td>
                  <td>{log.action}</td>
                  <td>{log.module}</td>
                  <td>{log.timestamp}</td>

                </tr>
              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Audit;