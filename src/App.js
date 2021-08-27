import React, { useState, useReducer, useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useImmerReducer } from "use-immer";
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
import Profile from "./components/Profile";
import Search from "./components/Search";
import EditPost from "./components/EditPost";
import StateContext from "./StateContext";
import DispatchContext from "./DispatchContext";
import { CSSTransition } from "react-transition-group";
import Axios from "axios";
import NotFound from "./components/NotFound";
Axios.defaults.baseURL = "http://localhost:8080";

function App(props) {
  const initialState = {
    loggedIn: Boolean(localStorage.getItem("chatpostToken")),
    flashMessages: [],
    user: {
      token: localStorage.getItem("chatpostToken"),
      username: localStorage.getItem("chatpostUsername"),
      avatar: localStorage.getItem("chatpostAvatar"),
    },
    isSearchOpen: false,
  };

  function ourReducer(draft, action) {
    switch (action.type) {
      case "login":
        draft.loggedIn = true;
        draft.user = action.data;
        return;
      case "logout":
        draft.loggedIn = false;
        return;
      case "flashMessage":
        draft.flashMessages.push(action.value);
        return;
      case "openSearch":
        draft.isSearchOpen = true;
        return;
      case "closeSearch":
        draft.isSearchOpen = false;
        return;
    }
  }

  const [state, dispatch] = useImmerReducer(ourReducer, initialState);

  useEffect(() => {
    if (state.loggedIn) {
      localStorage.setItem("chatpostToken", state.user.token);
      localStorage.setItem("chatpostUsername", state.user.username);
      localStorage.setItem("chatpostAvatar", state.user.avatar);
    } else {
      localStorage.removeItem("chatpostToken");
      localStorage.removeItem("chatpostUsername");
      localStorage.removeItem("chatpostAvatar");
    }
  }, [state.loggedIn]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BrowserRouter>
          <FlashMessages messages={state.flashMessages} />
          <Header />
          <Switch>
            <Route path='/profile/:username'>
              <Profile />
            </Route>
            <Route exact path='/'>
              {state.loggedIn ? <Home /> : <HomeGuest />}
            </Route>
            <Route path='/post/:id' exact>
              <ViewSinglePost />
            </Route>
            <Route path='/post/:id/edit' exact>
              <EditPost />
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
            <Route>
              <NotFound />
            </Route>
          </Switch>
          <CSSTransition
            timeout={330}
            in={state.isSearchOpen}
            classNames='search-overlay'
            unmountOnExit
          >
            <Search />
          </CSSTransition>
          <Footer />
        </BrowserRouter>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export default App;
