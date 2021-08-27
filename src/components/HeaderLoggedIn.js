import React, { useContext } from "react";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function HeaderLoggedIn(props) {
  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);

  function handleLogOut() {
    appDispatch({ type: "logout" });
  }

  function handleSearchIcon(e) {
    e.preventDefault();
    appDispatch({ type: "openSearch" });
  }
  return (
    <div className='flex-row my-3 my-md-0'>
      <a
        onClick={handleSearchIcon}
        href='#'
        className='text-white mr-2 header-search-icon'
        data-for='search'
        data-tip='Search'
      >
        <i className='fas fa-search'></i>
      </a>
      <ReactTooltip place='bottom' id='search' className='custom-tooltip' />{" "}
      <span
        className='mr-2 header-chat-icon text-white'
        data-for='chat'
        data-tip='Chat'
      >
        <i className='fas fa-comment'></i>
        <span className='chat-count-badge text-white'> </span>
      </span>
      <ReactTooltip place='bottom' id='chat' className='custom-tooltip' />{" "}
      <Link
        to={`/profile/${appState.user.username}`}
        className='mr-2'
        data-for='profile'
        data-tip='Profile'
      >
        <img className='small-header-avatar' src={appState.user.avatar} />
      </Link>
      <ReactTooltip place='bottom' id='profile' className='custom-tooltip' />{" "}
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
