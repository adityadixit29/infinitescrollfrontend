import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/index.css"
import axios from "axios";
import { Context,server } from "../main"
import toast from 'react-hot-toast'
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {isAuthenticated, setIsAuthenticated, loading, setLoading} = useContext(Context);
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(`${server}/users/new`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
      setIsAuthenticated(false);
      setLoading(false);
    }

  };
  if(isAuthenticated) return <Navigate to={"/"}/>
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <div className="heading"><p>SIGN UP</p></div>
          <div className="profilephoto">
            <img src="profile.svg" alt="" />
          </div>
          <div className="box1">
          <img src="user-solid.svg" alt="" />
          <input type="name" placeholder='Name'
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          </div>
          <div className="box1">
          <img src="user-solid.svg" alt="" />
          <input type="email" placeholder='Username'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className="box2">
          <img src="lock-solid.svg" alt="" />
          <input type="password" placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          </div>
          
          
          <div className="signup">
            <div className="left">
              <input type="checkbox" value="" />Remember me
            </div>
            <div className="right">
            <Link to={"/login"} className='register'>Login Here</Link>
            </div>
          </div>

          <button disabled={loading} className='login-btn' type='submit'>Login</button>

        </form>
      </section>
    </div>
  )
}

export default Register