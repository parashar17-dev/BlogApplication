import React, { useContext } from 'react';
import './Navbar.css';
import Img2 from '../img2.jpg';
import { Link } from 'react-router-dom';
import { BlogContext } from '../../pages/context/BlogState';
export default function Navbar() {
   // Getting the user from our context :
   const { user, logoutUser } = useContext(BlogContext);

   // Base url to access the images folder in api :
   const PF = '//localhost:5000/images/';

   return (
      <div className="Nav">
         <div className="Nav_left">
            <a className="Navtitle">
               <i className=" NavIcon fas fa-pen-square"></i>
               Digital Diary
            </a>
         </div>
         <div className="Nav_mid">
            <ul className="NavList">
               <Link to="/" className="link">
                  <li className="NavListItems">Home</li>
               </Link>

               <Link to="/" className="link">
                  <li className="NavListItems">About</li>
               </Link>
               <Link to="/" className="link">
                  <li className="NavListItems">Contact</li>
               </Link>
               <Link to="/write" className="link">
                  <li className="NavListItems">Write</li>
               </Link>

               {user && (
                  <li
                     className="NavListItems logout"
                     onClick={() => logoutUser()}
                  >
                     Logout
                  </li>
               )}
            </ul>
         </div>
         <div className="Nav_right">
            <i className="NavSearch fas fa-search"></i>
            {user ? (
               <Link className="link" to="/settings">
                  {user.profilePic ? (
                     <img
                        className="NavImg"
                        src={PF + user.profilePic}
                        alt="picture"
                     />
                  ) : (
                     <img className="NavImg" src={Img2} alt="picture" />
                  )}
               </Link>
            ) : (
               <ul className="NavList">
                  <Link className="link" to="/login">
                     <li className="NavListItems logout">Login</li>
                  </Link>
                  <Link className="link" to="/register">
                     <li className="NavListItems ">Register</li>
                  </Link>
               </ul>
            )}
         </div>
      </div>
   );
}
