function RecentActivity({activities}){

  return(

    <div className="activity-card">

      <h3>Recent Activity</h3>

      <ul>

        {activities.map((a,index)=>(
          <li key={index}>

            <strong>{a.action}</strong>

            <span style={{marginLeft:"10px",color:"gray"}}>
              {a.time}
            </span>

          </li>
        ))}

      </ul>

    </div>

  )

}

export default RecentActivity;