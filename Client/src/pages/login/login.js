import React, { useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogState';
import './login.css';

function Login() {
   const userRef = useRef();
   const passwordRef = useRef();

   const { setisFetching, setUser, user, isFetching } = useContext(BlogContext);

   const handleLoginSubmit = async (e) => {
      e.preventDefault();
      setisFetching();
      setUser(userRef.current.value, passwordRef.current.value);
   };
   return (
      <div className="login">
         <span className="loginTitle">Login</span>
         <form className="loginForm" onSubmit={handleLoginSubmit}>
            <label>Username</label>
            <input
               className="loginInput"
               type="text"
               placeholder="Enter Your Username..."
               ref={userRef}
            />
            <label>Password</label>
            <input
               className="loginInput"
               type="password"
               placeholder="Enter Your Password..."
               ref={passwordRef}
            />
            <button className="loginButton" type="submit" disabled={isFetching}>
               <Link className="link" to="/login">
                  Login
               </Link>
            </button>
         </form>
         <button className="loginRegisterButton">
            <Link className="link" to="/register">
               Register
            </Link>
         </button>
      </div>
   );
}

export default Login;
