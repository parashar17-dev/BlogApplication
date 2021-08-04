import React from 'react';
import { Link } from 'react-router-dom';
import './post.css';
function post({ post }) {
   const PF = 'http://localhost:5000/images/';
   return (
      <Link className="link" to={`/post/${post._id}`}>
         <div className="post">
            {post.photo && (
               <img className="postImg" src={PF + post.photo} alt="" />
            )}
            <div className="postInfo">
               <div className="postCats">
                  {post.categories &&
                     post.categories.map((cat) => (
                        <span className="postCat">{cat}</span>
                     ))}
               </div>

               <span className="postTitle">{post.title}</span>

               <hr />
               <span className="postDate">
                  {new Date(post.createdAt).toDateString()}
               </span>
            </div>
            <p className="postDec">{post.desc}</p>
         </div>
      </Link>
   );
}

export default post;
