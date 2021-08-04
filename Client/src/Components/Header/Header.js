import React from 'react';
import './Header.css';
import Img from './img.jpg';
function Header() {
   return (
      <div className="Header">
         <div className="headerTitles">
            <span className="headerTitlesm">React & Node</span>
            <span className="headerTitlelg">Blog</span>
         </div>
         <img className="headerImg" src={Img} alt="" />
      </div>
   );
}

export default Header;
