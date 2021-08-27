import React, { useEffect, useContext, useState } from "react";
import Page from "./Page";
import { useParams } from "react-router-dom";
import Axios from "axios";
import StateContext from "../StateContext";
import ProfilePosts from "./ProfilePosts";
import Loading from "./Loading";

function Profile() {
  const [isLoading, setIsLoading] = useState();

  const { username } = useParams();
  const appState = useContext(StateContext);
  const [profileData, setProfileData] = useState({
    profileUsername: "...",
    profileAvatar:
      "https://en.gravatar.com/userimage/210683691/58f6eeaa18dea9418c2156d522498fff.png",
    isFollowing: false,
    counts: { postCount: "", followerCount: "", followingCount: "" },
  });

  useEffect(() => {
    const ourRequest = Axios.CancelToken.source();

    async function fetchData() {
      try {
        const response = await Axios.post(
          `/profile/${username}`,
          {
            token: appState.user.token,
          },
          { cancelToken: ourRequest.token }
        );
        setProfileData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log("Request has been aborted", error);
      }
    }
    fetchData();
    return () => {
      ourRequest.cancel();
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <Page title='Profile'>
      <h2>
        <img className='avatar-small' src={profileData.profileAvatar} />{" "}
        {/* <img className='avatar-small' src='./chat.png' />{" "} */}
        {profileData.profileUsername}
        <button className='btn btn-primary btn-sm ml-2'>
          Follow <i className='fas fa-user-plus'></i>
        </button>
      </h2>

      <div className='profile-nav nav nav-tabs pt-2 mb-4'>
        <a href='#' className='active nav-item nav-link'>
          Posts: {profileData.counts.postCount}
        </a>
        <a href='#' className='nav-item nav-link'>
          Followers: {profileData.counts.followerCount}
        </a>
        <a href='#' className='nav-item nav-link'>
          Following: {profileData.counts.followingCount}
        </a>
      </div>

      <ProfilePosts />
    </Page>
  );
}

export default Profile;
