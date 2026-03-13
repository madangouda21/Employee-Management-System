import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css";

import { loginUser } from "../services/authService";

function Login(){

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [showPassword,setShowPassword] = useState(false);

  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);


  const validateForm = () => {

    if(!email || !password){
      setError("Email and password are required");
      return false;
    }

    if(!email.includes("@")){
      setError("Enter valid email address");
      return false;
    }

    return true;
  };


  const handleLogin = async (e) => {

    e.preventDefault();

    setError(null);

    if(!validateForm()) return;

    setLoading(true);

    try{

      const response = await loginUser(email,password);

      const token = response.token;

      if(!token){
        throw new Error("Invalid login response");
      }

      localStorage.setItem("token",token);

      navigate("/dashboard");

    }catch(err){

      console.error("Login error:",err);

      setError("Invalid email or password");

    }

    setLoading(false);

  };


  return(

    <div className="login-container">

      <h2>HRMS Admin Login</h2>

      <form onSubmit={handleLogin}>

        <div className="form-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>


        <div className="form-group">

          <label>Password</label>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />

        </div>


        <div style={{marginTop:"10px"}}>

          <label>

            <input
              type="checkbox"
              onChange={()=>setShowPassword(!showPassword)}
            />

            Show Password

          </label>

        </div>


        {error && (

          <p className="error-message">

            {error}

          </p>

        )}


        <button
          type="submit"
          disabled={loading}
        >

          {loading ? "Logging in..." : "Login"}

        </button>

      </form>

    </div>

  )

}

export default Login;