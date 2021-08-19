import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";
import HomeGuest from "./components/HomeGuest";
import AboutUs from "./components/AboutUs";
import Terms from "./components/Terms";
import CreatePost from "./components/CreatePost";
import ViewSinglePost from "./components/ViewSinglePost";
import FlashMessages from "./components/FlashMessages";
import CreateContext from "./CreateContext";
import Axios from "axios";
Axios.defaults.baseURL = "http://localhost:8080";

function App(props) {
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("chatpostToken"))
  );
  const [flashMessages, setFlashMessages] = useState([]);

  function addFlashMessage(msg) {
    setFlashMessages((prev) => prev.concat(msg));
  }
  return (
    <CreateContext.Provider value={{ addFlashMessage, setLoggedIn }}>
      <BrowserRouter>
        <FlashMessages messages={flashMessages} />
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path='/'>
            {loggedIn ? <Home /> : <HomeGuest />}
          </Route>
          <Route path='/post/:id'>
            <ViewSinglePost />
          </Route>
          <Route path='/create-post'>
            <CreatePost />
          </Route>
          <Route path='/about-us'>
            <AboutUs />
          </Route>
          <Route path='/terms'>
            <Terms />
          </Route>
        </Switch>
        <Footer />
      </BrowserRouter>
    </CreateContext.Provider>
  );
}

export default App;
