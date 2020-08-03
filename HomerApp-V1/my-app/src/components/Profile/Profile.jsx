import React, { Fragment } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileTabs from './ProfileTabs'





const styles = {
  avatarPic: {
    maxWidth: "25vw",
  }
}

const Profile = () => {



  const {
    // isLoading,
    isAuthenticated,
    // error,
    user,
    // loginWithRedirect,
    // logout,
  } = useAuth0();
  // const { user, isAuthenticated } = useAuth0();


  return (
    <Fragment>
      <ProfileTabs />
      

      {isAuthenticated && (
        <div id="Profile">
          <img id="avatarPic" style={styles.avatarPic} src={user.picture} alt={user.name} />
          <h2 id='userName'>{user.name}</h2>
          <p>{isAuthenticated}</p>
          <p>{user.email}</p>
        </div>
      )}

    </Fragment>
  );
};

export default Profile;