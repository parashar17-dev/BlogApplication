import React, { useContext } from 'react';
import Navbar from './Components/Navbar/Navbar';
import Home from './pages/home/Home.js';
import Write from './pages/write/write';
import Setting from './pages/settings/Setting';
import Single from './pages/Single/Single';
import Login from './pages/login/login';
import Register from './pages/register/Register';
import './App.css';
import { BlogContext } from './pages/context/BlogState';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
function App() {
   const { user } = useContext(BlogContext);

   return (
      <Router>
         <div className="App">
            <Navbar />
            <Switch>
               <Route exact path="/">
                  <Home />
               </Route>
               <Route exact path="/register">
                  {user ? <Home /> : <Register />}
               </Route>
               <Route exact path="/login">
                  {user ? <Home /> : <Login />}
               </Route>
               <Route exact path="/write">
                  {user ? <Write /> : <Login />}
               </Route>
               <Route exact path="/settings">
                  {user ? <Setting /> : <Login />}
               </Route>
               <Route exact path="/post/:postId">
                  <Single />
               </Route>
            </Switch>
         </div>
      </Router>
   );
}

export default App;
