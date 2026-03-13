import { useEffect, useState } from "react";
import "../assets/css/style.css";

import { getAuditLogs } from "../services/auditService";

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

      const data = await getAuditLogs();

      setLogs(data);

    }catch(err){

      setError("Failed to load audit logs");

    }

    setLoading(false);

  };


  const filteredLogs = logs.filter((log)=>

    log.action?.toLowerCase().includes(search.toLowerCase())

  );


  return(

    <div className="page-container">

      <h1 className="page-title">Audit Logs</h1>


      {/* Search */}

      <input
        type="text"
        placeholder="Search activity..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="search-box"
      />


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

            {filteredLogs.length === 0 && (

              <tr>
                <td colSpan="5">No logs found</td>
              </tr>

            )}

            {filteredLogs.map((log)=>(
              <tr key={log.id}>

                <td>{log.id}</td>

                <td>{log.userEmail}</td>

                <td>{log.action}</td>

                <td>{log.module}</td>

                <td>{log.timestamp}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  )

}

export default Audit;