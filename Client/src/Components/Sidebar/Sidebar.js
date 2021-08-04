import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import Avatar from './Avatar.png';
import axios from 'axios';
function Sidebar() {
   const [cats, setCats] = useState([]);

   useEffect(() => {
      const getCats = async () => {
         const res = await axios.get('/Categories');
         setCats(res.data);
      };
      getCats();
   }, []);

   return (
      <div className="sidebar">
         {/* About me Info Container*/}
         <div className="sidebarItem">
            <span className="sidebarTitle">ABOUT ME</span>
            <img
               className="sidebarAvatar"
               src={Avatar}
               alt="This is a avatar"
            />
            <p>
               Lorem Ipsum is simply dummy text of the printing and typesetting
               industry. Lorem Ipsum has been the industry's standard dummy text
               ever since the 1500s, when an unknown printer took a galley of
               type and scrambled it to make a type specimen book. It has
               survived not only five centuries, but also the leap into
            </p>
         </div>

         {/* various blog categories container */}
         <div className="sidebarItem">
            <span className="sidebarTitle">Categories</span>
            <ul className="sidebarList">
               {cats.map((c) => (
                  <Link className="link" to={`/?cat=${c.name}`}>
                     <li className="sidebarListItem">{c.name}</li>
                  </Link>
               ))}
            </ul>
         </div>

         {/* Social Media Handles Container */}
         <div className="sidebarItem">
            <span className="sidebarTitle">Follow us</span>
            <div className="sidebarSocial">
               <i className="sidebarIcon fab fa-facebook-square"></i>
               <i className="sidebarIcon fab fa-twitter-square"></i>
               <i className="sidebarIcon fab fa-pinterest-square"></i>
               <i className="sidebarIcon fab fa-instagram-square"></i>
            </div>
         </div>
      </div>
   );
}

export default Sidebar;
