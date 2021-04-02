import React, { createContext, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Headers from './Component/Headers/Headers';
import Home from './Component/Home/Home';
import Login from './Component/Login/Login';
import NotFound from './Component/NotFound/NotFound';
import Admin from './Component/Admin/Admin';
import Orders from './Component/Orders/Orders';
import PrivateRoute from './Component/PrivateRoute/PrivateRoute';
import CheckOut from './Component/CheckOut/CheckOut';
import Greeting from './Component/Greeting/Greeting';

export const userContext = createContext()

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Headers></Headers>
      <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/addProduct">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/manageProduct">
            <Admin></Admin>
          </PrivateRoute>
          <PrivateRoute path="/orders">
            <Orders></Orders>
          </PrivateRoute>
          <PrivateRoute path="/checkOut/:id">
            <CheckOut></CheckOut>
          </PrivateRoute>
          <Route path="/greeting">
            <Greeting></Greeting>
          </Route>
          <Route path="/">
            <Home />
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
