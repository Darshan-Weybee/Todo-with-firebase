import React from "react";
import "./profile.css";

function Profile({user}){

    return <div className="card">
    <img src={user.providerData[0].photoURL} className="card-img-top" alt="profile"/>
    <div className="card-body">
      <h5 className="card-title">Name : {user.providerData[0].displayName}</h5>
      <p className="card-text">Email : {user.providerData[0].email}</p>
    </div>
</div>
}

export default Profile