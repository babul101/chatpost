import React, { useState } from "react";
import pic from "../chat.png";
import Page from "./Page";
import Axios from "axios";

function HomeGuest() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:8080/register", {
        username,
        email,
        password,
      });
      console.log("User is created");
    } catch (error) {
      console.log("There is an error", error);
    }
  }

  return (
    <>
      <Page title='Home' wide={true}>
        <div className='row align-items-center'>
          <div className='col-lg-7 py-3 py-md-5'>
            <span className='image'>
              <img src={pic} alt='chatpost' style={{ height: "150px" }} />
            </span>
            <p className='lead text-muted'>
              <span style={{ fontSize: "35px", lineHeight: "45px" }}>J</span>ump
              over the platform to connect with your nodes. Provides a safe and
              secure terminal for chatting.Come along and join the hands for a
              better and secure community leaving all traditional methods to
              reach out your closed ones.
            </p>
          </div>
          <div className='col-lg-5 pl-lg-5 pb-3 py-lg-5'>
            <form onSubmit={handleSubmit}>
              <div className='form-group'>
                <label htmlFor='username-register' className='text-muted mb-1'>
                  <small>Username</small>
                </label>
                <input
                  id='username-register'
                  name='username'
                  className='form-control shadow-none'
                  type='text'
                  placeholder='Pick a username'
                  autoComplete='off'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='email-register' className='text-muted mb-1'>
                  <small>Email</small>
                </label>
                <input
                  id='email-register'
                  name='email'
                  className='form-control shadow-none'
                  type='text'
                  placeholder='xyz@example.com'
                  autoComplete='off'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form-group'>
                <label htmlFor='password-register' className='text-muted mb-1'>
                  <small>Password</small>
                </label>
                <input
                  id='password-register'
                  name='password'
                  className='form-control shadow-none'
                  type='password'
                  placeholder='Create a password'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='py-3 mt-4 btn btn-lg header-bar btn-block'
                style={{ color: "white" }}
              >
                Sign up for Chatpost
              </button>
            </form>
          </div>
        </div>
      </Page>
    </>
  );
}

export default HomeGuest;
