import React from "react";
import pic from "../components/chat.png";
function HomeGuest() {
  return (
    <>
      <div className='container py-md-5'>
        <div className='row align-items-center'>
          <div className='col-lg-7 py-3 py-md-5'>
            <span>
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
            <form>
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
      </div>
    </>
  );
}

export default HomeGuest;
