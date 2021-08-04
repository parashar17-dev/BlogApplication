import React from 'react';
import './posts.css';
import Post from '../post/post';
function posts({ posts }) {
   return (
      <div className="posts">
         {posts.map((post) => (
            <Post post={post} key={post.id} />
         ))}
      </div>
   );
}

export default posts;
