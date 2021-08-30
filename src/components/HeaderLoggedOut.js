import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import DispatchContext from "../DispatchContext";

function HeaderLoggedOut(props) {
  const appDispatch = useContext(DispatchContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("http://localhost:8080/login", {
        username,
        password,
      });
      if (response.data) {
        // localStorage.setItem("chatpostToken", response.data.token);
        // localStorage.setItem("chatpostUsername", response.data.username);
        // localStorage.setItem("chatpostAvatar", response.data.avatar);
        appDispatch({ type: "login", data: response.data });
        appDispatch({
          type: "flashMessage",
          value: "You have successfully logged in",
        });
      } else {
        appDispatch({
          type: "flashMessage",
          value: "Invalid username or password",
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form className='mb-0 pt-2 pt-md-0' onSubmit={handleSubmit}>
      <div className='row align-items-center'>
        <div className='col-md mr-0 pr-md-0 mb-3 mb-md-0'>
          <input
            name='username'
            className='form-control form-control-sm '
            type='text'
            placeholder='Username'
            autoComplete='off'
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className='col-md mr-0 pr-md-0 mb-3 mb-md-0'>
          <input
            name='password'
            className='form-control form-control-sm '
            type='password'
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className='col-md-auto'>
          <button className='btn btn-sm' style={{ color: "white" }}>
            Sign In
          </button>
        </div>
      </div>
    </form>
  );
}

export default HeaderLoggedOut;
