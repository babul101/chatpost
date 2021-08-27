import React, { useState, useEffect, useContext } from "react";
import Page from "./Page";
import { Link, useParams, withRouter } from "react-router-dom";
import Axios from "axios";
import Loading from "./Loading";
import ReactMarkdown from "react-markdown";
import ReactTooltip from "react-tooltip";
import NotFound from "./NotFound";
import StateContext from "../StateContext";
import DispatchContext from "../DispatchContext";

function ViewSinglePost(props) {
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState();
  const [post, setPost] = useState();

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source(); // To avoid Memory leak situation
    async function fetchPost() {
      try {
        const response = await Axios.get(`/post/${id}`, {
          cancelToken: ourRequest.token,
        });

        setPost(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Request has been aborted", error);
      }
    }
    fetchPost();
    return () => {
      ourRequest.cancel();
    };
  }, [id]); //Dependency array in useEffect is empty thus implicating that axios will run once when it is first mountedor rendered
  // if dependency array in useEffect is not empty then axios can run multiple times

  if (!isLoading && !post) {
    return <NotFound />;
  }

  if (isLoading) {
    return (
      <Page title='...'>
        <Loading />
      </Page>
    );
  }

  const date = new Date(post.createdDate);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  function isOwner() {
    if (appState.loggedIn) {
      return appState.user.username == post.author.username;
    } else {
      return false;
    }
  }

  async function deleteHandler() {
    const dismiss = window.confirm("Are you sure you want to delete");
    if (dismiss) {
      try {
        const response = await Axios.delete(`/post/${id}`, {
          data: { token: appState.user.token },
        });
        if (response.data == "Success") {
          appDispatch({
            type: "flashMessage",
            value: "Post was successfully deleted",
          });
          props.history.push(`/profile/${appState.user.username}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <Page title={post.title}>
      <div className='d-flex justify-content-between'>
        <h2>{post.title}</h2>
        {isOwner() && (
          <span className='pt-2'>
            <Link
              to={`/post/${post._id}/edit`}
              data-tip='Edit'
              data-for='edit'
              className='text-primary mr-2'
            >
              <i className='fas fa-edit'></i>
            </Link>
            <ReactTooltip id='edit' className='custom-tooltip' />{" "}
            <a
              data-tip='Delete'
              data-for='delete'
              className='delete-post-button text-danger'
              onClick={deleteHandler}
            >
              <i className='fas fa-trash'></i>
            </a>
            <ReactTooltip id='delete' className='custom-tooltip' />
          </span>
        )}
      </div>

      <p className='text-muted small mb-4'>
        <Link to={`/profile/${post.author.username}`}>
          <img className='avatar-tiny' src={post.author.avatar} />
        </Link>
        Posted by{" "}
        <Link to={`/profile/${post.author.username}`}>
          {post.author.username}
        </Link>{" "}
        on {formattedDate}
      </p>

      <div className='body-content'>
        <ReactMarkdown children={post.body} />
      </div>
    </Page>
  );
}

export default withRouter(ViewSinglePost);
