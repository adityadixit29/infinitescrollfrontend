import React, {useContext} from 'react'
// import "../styles/header.scss";
import "../styles/index.css";
import {Link} from "react-router-dom"
import { Context, server } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Header = () => {
  const {isAuthenticated, setIsAuthenticated,loading, setLoading} = useContext(Context)
  console.log(isAuthenticated)

  const logoutHandler = async () => {
    setLoading(true)
    try {
      await axios.get(`${server}/users/logout`,
        {
          withCredentials: true,
        }
      );
      toast.success("Logged Out Successfully");
      setLoading(false);
      setIsAuthenticated(false);
    } catch (error) {
      toast.error(error.response.message);
      console.log(error);
      setIsAuthenticated(true);
      setLoading(false);
    }

  };

  return (
    <nav className="header">

      <article>
        <Link to={"/"} className='homebtn'>Home</Link>


        {isAuthenticated ? <button disabled={loading} onClick={logoutHandler} className="btn">Logout</button>
         : <Link to={"/login"}>Login</Link>}
        
      </article>
    </nav>
  )
};

export default Header