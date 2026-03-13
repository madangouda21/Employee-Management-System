import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

function EmployeeChart({data}){

  return(

    <div style={{width:"100%",height:300}}>

      <ResponsiveContainer>

        <BarChart data={data}>

          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Bar dataKey="employees" fill="#4e73df" />

        </BarChart>

      </ResponsiveContainer>

    </div>

  )

}

export default EmployeeChart;