import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";
import Loading from "./Loading";

function ProfileFollowers() {
  const { username } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchPosts() {
      try {
        const response = await Axios.get(`/profile/${username}/followers`, {
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
  }, [username]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className='list-group'>
      {posts.map((follower, index) => {
        return (
          <Link
            key={index}
            to={`/profile/${follower.username}`}
            className='list-group-item list-group-item-action'
          >
            <img className='avatar-tiny' src={follower.avatar} />
            {follower.username}
          </Link>
        );
      })}
    </div>
  );
}

export default ProfileFollowers;
