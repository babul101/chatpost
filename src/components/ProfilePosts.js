import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";

function ProfilePosts() {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/posts`, {
          cancelToken: ourRequest.token,
        });
        setPosts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Request has been aborted", error);
      }
    }
    fetchPosts();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  return (
    <div className='list-group'>
      {posts.map((post) => {
        const date = new Date(post.createdDate);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className='list-group-item list-group-item-action'
          >
            <img className='avatar-tiny' src={post.author.avatar} />
            <strong>{post.title}</strong>{" "}
            <span className='text-muted small'>on {formattedDate} </span>
          </Link>
        );
      })}
    </div>
  );
}

export default ProfilePosts;
