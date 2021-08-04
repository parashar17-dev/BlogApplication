import React, { useState, useEffect } from 'react';
import './Home.css';
import Posts from '../../Components/Posts/posts';
import axios from 'axios';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Header from '../../Components/Header/Header.js';
import { useLocation } from 'react-router-dom';
function Home() {
   const [posts, setPosts] = useState([]);
   const { search } = useLocation();

   useEffect(() => {
      const fetchPosts = async () => {
         const res = await axios.get('/posts' + search);
         setPosts(res.data);
      };
      fetchPosts();
   }, [search]);
   return (
      <>
         <Header />
         <div className="home">
            <Posts posts={posts} />
            <Sidebar />
         </div>
      </>
   );
}

export default Home;
