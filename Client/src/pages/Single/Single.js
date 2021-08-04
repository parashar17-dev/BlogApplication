import React from 'react';
import './Single.css';
import Sidebar from '../../Components/Sidebar/Sidebar';
import SinglePost from '../../Components/singlePost/SinglePost';
function Single() {
   return (
      <div className="single">
         {/* Post */}
         <SinglePost />
         <Sidebar />
      </div>
   );
}

export default Single;
