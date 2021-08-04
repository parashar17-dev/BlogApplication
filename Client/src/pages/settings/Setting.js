import React, { useContext, useState } from 'react';
import './setting.css';
import Img2 from '../../Components/img2.jpg';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { BlogContext } from '../context/BlogState';
import axios from 'axios';
function Setting() {
   const { user, setUpdateUser, logoutUser } = useContext(BlogContext);
   const [file, setFile] = useState(null);
   const [username, setUsername] = useState(user.username);
   const [email, setEmail] = useState(user.email);
   const [password, setPassword] = useState(user.password);
   const [success, setSuccess] = useState(false);
   const PF = '//localhost:5000/images/';
   const handleSubmit = async (e) => {
      e.preventDefault();
      const updatedUser = {
         userId: user._id,
         username,
         email,
         password,
      };
      if (file) {
         const data = new FormData();
         const filename = Date.now() + file.name;
         data.append('name', filename);
         data.append('file', file);
         updatedUser.profilePic = filename;
         try {
            await axios.post('/upload', data);
         } catch (err) {}
      }
      try {
         const res = await axios.put('/users/' + user._id, updatedUser);
         setUpdateUser(res.data);
         setSuccess(true);
         setTimeout(() => {
            setSuccess(false);
         }, 2000);
      } catch (err) {}
   };

   const handleClick = async () => {
      try {
         await axios.delete('/users/' + user._id, {
            data: {
               username: user.username,
               userId: user._id,
            },
         });
         logoutUser();
      } catch {}
   };
   return (
      <div className="settings">
         <div className="settingsWrapper">
            <div className="settingsTitle">
               <span className="settingUpdateTitle">Upadate your Account</span>
               <span className="settingDeleteTitle" onClick={handleClick}>
                  Delete your Account
               </span>
            </div>
            <form className="settingForm" onSubmit={handleSubmit}>
               <label htmlFor="">Profile Picture</label>
               <div className="settingsPP">
                  {file ? (
                     <img src={file && URL.createObjectURL(file)} alt="" />
                  ) : user.profilePic ? (
                     <img src={PF + user.profilePic} alt="" />
                  ) : (
                     <img src={Img2} alt="" />
                  )}

                  <label htmlFor="fileInput">
                     <i class="settingsPPIcon far fa-user-circle"></i>
                  </label>
                  <input
                     type="file"
                     id="fileInput"
                     style={{ display: 'none' }}
                     onChange={(e) => {
                        setFile(e.target.files[0]);
                     }}
                  />
               </div>
               <label>Username</label>
               <input
                  type="text"
                  placeholder={user.username}
                  onChange={(e) => setUsername(e.target.value)}
               />
               <label>Email</label>
               <input
                  type="email"
                  placeholder={user.email}
                  onChange={(e) => setEmail(e.target.value)}
               />

               <label>Password</label>
               <input
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
               />
               <button className="settingSubmit" type="submit">
                  Update
               </button>
               {success && (
                  <span
                     style={{
                        color: 'green',
                        textAlign: 'center',
                        margin: '20px',
                     }}
                  >
                     Your Profile has been updated
                  </span>
               )}
            </form>
         </div>
         <Sidebar />
      </div>
   );
}

export default Setting;
