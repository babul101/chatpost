import React, { useContext } from "react";
import { Link } from "react-router-dom";
import CreateContext from "../CreateContext";

function HeaderLoggedIn(props) {
  const { setLoggedIn } = useContext(CreateContext);
  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem("chatpostToken");
    localStorage.removeItem("chatpostUsername");
    localStorage.removeItem("chatAvatar");
  }
  return (
    <div className='flex-row my-3 my-md-0'>
      <a href='#' className='text-white mr-2 header-search-icon'>
        <i className='fas fa-search'></i>
      </a>
      <span className='mr-2 header-chat-icon text-white'>
        <i className='fas fa-comment'></i>
        <span className='chat-count-badge text-white'> </span>
      </span>
      <a href='#' className='mr-2'>
        <img
          className='small-header-avatar'
          src={localStorage.getItem("chatpostAvatar")}
        />
      </a>
      <Link className='btn btn-sm header-bar mr-2' to='/create-post'>
        Create Post
      </Link>
      <button className='btn btn-sm header-bar' onClick={handleLogOut}>
        Sign Out
      </button>
    </div>
  );
}

export default HeaderLoggedIn;
