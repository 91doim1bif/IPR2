import React from "react";
import { getCurrentUser } from "../services/auth.service";

const Profile: React.FC = () => {
  const currentUser = getCurrentUser();

  console.log(currentUser);
  console.log(currentUser.user);

  if (!currentUser || !currentUser.user) {
    return <div>Loading...</div>; // or handle the null case in some other way
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{currentUser.user.name}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {currentUser.user._id} {/* Assuming _id is the user id */}
      </p>
      <p>
        <strong>Email:</strong> {currentUser.user.email}
      </p>
      <p>
        <strong>Password:</strong> {currentUser.user.password}
      </p>
    </div>
  );
};

export default Profile;
