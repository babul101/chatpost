import React, { useEffect, useState, useContext } from "react";
import Axios from "axios";
import CreateContext from "../CreateContext";
function HeaderLoggedOut(props) {
  const { setLoggedIn } = useContext(CreateContext);
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
        localStorage.setItem("chatpostToken", response.data.token);
        localStorage.setItem("chatpostUsername", response.data.username);
        localStorage.setItem("chatpostAvatar", response.data.avatar);
        setLoggedIn(true);
      } else {
        console.log("Incorrect username or password");
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
