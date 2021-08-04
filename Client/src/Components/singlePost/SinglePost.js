import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import './SinglePost.css';
import Img2 from '../img2.jpg';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { BlogContext } from '../../pages/context/BlogState';
function SinglePost() {
   const location = useLocation();
   const path = location.pathname.split('/')[2];
   const PF = 'http://localhost:5000/images/';
   const [post, setPost] = useState({});
   const { user } = useContext(BlogContext);
   const [title, setTitle] = useState('');
   const [desc, setDesc] = useState('');
   const [updateMode, setUpdateMode] = useState('');

   useEffect(() => {
      const getPost = async () => {
         const res = await axios.get('/posts/' + path);
         setPost(res.data);
         setTitle(res.data.title);
         setDesc(res.data.desc);
      };
      getPost();
   }, [path]);

   const handleDelete = async () => {
      try {
         await axios.delete('/posts/' + path, {
            data: {
               username: user.username,
            },
         });
         window.location.replace('/');
      } catch (err) {}
   };

   const handleUpdate = async () => {
      try {
         await axios.put(`/posts/${post._id}`, {
            username: user.username,
            title,
            desc,
         });
         setUpdateMode(false);
      } catch {}
   };
   return (
      <div className="singlePost">
         <div className="singlePostWrapper">
            {post.photo && (
               <img src={PF + post.photo} alt="" className="singlePostImg" />
            )}

            {updateMode ? (
               <input
                  type="text"
                  value={title}
                  className="singlePostTitleInput"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
               />
            ) : (
               <h1 className="singlePostTitle">
                  {title}
                  {post.username === user?.username && (
                     <div className="singlePostEdit">
                        <i
                           className="singlePostIcon far fa-edit"
                           onClick={() => setUpdateMode(true)}
                        ></i>
                        <i
                           className="singlePostIcon far fa-trash-alt"
                           onClick={handleDelete}
                        ></i>
                     </div>
                  )}
               </h1>
            )}
            <div className="singlePostinfo">
               <span className="singlePostAuthor">
                  Author:
                  <Link className="link" to={`/?user=${post.username}`}>
                     <b>{post.username}</b>
                  </Link>
               </span>
               <span className="singlePostDate">
                  {new Date(post.createdAt).toDateString()}
               </span>
            </div>
            {updateMode ? (
               <textarea
                  type="text"
                  className="singlePostDescInput"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
               />
            ) : (
               <p className="singlePostDesc">{desc}</p>
            )}
            {updateMode && (
               <button className="singlePostButton" onClick={handleUpdate}>
                  Update
               </button>
            )}
         </div>
      </div>
   );
}

export default SinglePost;
