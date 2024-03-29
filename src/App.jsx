import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from './pages/Register';

import {Toaster} from "react-hot-toast";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Context, server } from "./main";

function App() {
  const {user,setUser,isAuthenticated,setIsAuthenticated,setLoading } = useContext(Context)
  useEffect(()=>{
    setLoading(true);
    axios.get(`${server}/users/me`,{
      withCredentials:true,
    }).then(res=>{
      setUser(res.data.user);
      console.log(user);
      setLoading(false);
      setIsAuthenticated(true);
    }).catch((error)=>{
      setUser({})
      setIsAuthenticated(false)
      setLoading(false);
    })
    
  },[])
  return( 
  <Router>

{isAuthenticated && <Header />}
    <Routes>
      <Route path="/" element = {<Home />} />
      <Route path="/login" element = {<Login />} />
      <Route path="/register" element = {<Register />} />
    </Routes>
    <Toaster />
  </Router>
  );
}

export default App

