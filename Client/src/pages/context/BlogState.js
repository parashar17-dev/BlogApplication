import React, { useReducer } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import BlogReducer from './BlogReducer';
import { createContext } from 'react';

export const BlogContext = createContext();

const BlogState = (props) => {
   const initialState = {
      user: JSON.parse(localStorage.getItem('user')) || null,
      isFetching: false,
      error: false,
   };

   const [state, dispatch] = useReducer(BlogReducer, initialState);

   const setisFetching = () => dispatch({ type: 'LOGIN_START' });

   const setUser = async (id, pass) => {
      try {
         const res = await axios.post('/auth/login', {
            username: id,
            password: pass,
         });
         dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      } catch (err) {
         dispatch({ type: 'LOGIN_FAILURE' });
      }
   };
   const logoutUser = () => {
      dispatch({ type: 'LOGOUT' });
   };

   const setUpdateUser = (res) => {
      dispatch({ type: 'UPDATE_SUCCESS', payload: res });
   };
   useEffect(() => {
      localStorage.setItem('user', JSON.stringify(state.user));
   }, [state.user]);

   return (
      <BlogContext.Provider
         value={{
            user: state.user,
            isFetching: state.isFetching,
            error: state.error,
            setisFetching,
            setUser,
            logoutUser,
            setUpdateUser,
         }}
      >
         {props.children}
      </BlogContext.Provider>
   );
};

export default BlogState;
