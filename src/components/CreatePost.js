import React, { useState, useContext } from "react";
import Page from "./Page";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import DispatchContext from "../DispatchContext";
import StateContext from "../StateContext";

function CreatePost(props) {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();

  const appDispatch = useContext(DispatchContext);
  const appState = useContext(StateContext);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await Axios.post("/create-post", {
        title,
        body,
        token: appState.user.token,
      });
      appDispatch({ type: "flashMessage", value: "Congrat's on a new post" });
      props.history.push(`/post/${response.data}`);
      console.log("New post was created");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Page title='Create New Post'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='post-title' className='text-muted mb-1'>
            <small>Title</small>
          </label>
          <input
            autoFocus
            name='title'
            id='post-title'
            className='form-control form-control-lg form-control-title'
            type='text'
            placeholder=''
            autoComplete='off'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='post-body' className='text-muted mb-1 d-block'>
            <small>Body Content</small>
          </label>
          <textarea
            name='body'
            id='post-body'
            className='body-content tall-textarea form-control'
            type='text'
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>

        <button className='btn header-bar'>Save New Post</button>
      </form>
    </Page>
  );
}

export default withRouter(CreatePost);
