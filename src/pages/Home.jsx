import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { Context, server } from '../main';
import toast from 'react-hot-toast';
import { Navigate } from 'react-router-dom';

const Home = () => {
  const [data, setdata] = useState([]);
  const [page, setPage] = useState(1);
  const getdata = async () => {
    try {
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=8&_page=${page}`)
      console.log(data);
      // const data = await response.json();
      if (page === 1) {
        setdata(data);
      } else {
        setdata((prev)=> [...prev, ...data]);
      }
      // setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getdata()
  }, [page])

  const handelInfiniteScroll = async () => {
    console.log("scrollHeight" + document.documentElement.scrollHeight);
    console.log("innerHeight" + window.innerHeight);
    console.log("scrollTop" + document.documentElement.scrollTop);
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ){
        // setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const { isAuthenticated } = useContext(Context);

  if (!isAuthenticated) return <Navigate to={"/login"} />
  return (
    <div className="table">

      {/* {data.map((item)=>(
        <p key={item.id}>{item.title}</p>
       ))} */}
 {data.map((item) => (
      <div className="card-container" key={item.id}>
       
          <div className="card-heading"> Name: {item.id}</div>
          <div className="card-message">
           {item.title}
          </div>
      </div>
       ))}
    </div>
  );
};

export default Home