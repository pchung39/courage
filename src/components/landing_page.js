import React from 'react';
import { Link } from "react-router-dom";



const Landing = () => {
  return (
    <div className="landingCanvas">
      <div className="landing">
        <h1 className="titleLetter1">C</h1>
        <h1 className="titleLetter2">O</h1>
        <h1 className="titleLetter3">U</h1>
        <h1 className="titleLetter4">R</h1>
        <h1 className="titleLetter5">A</h1>
        <h1 className="titleLetter6">G</h1>
        <h1 className="titleLetter7">E</h1>
      </div>
      <div className="landingPageContainer">
        <div className="landingButton">
          <i className="fa fa-thumbs-up" aria-hidden="true"></i>
          <button id="landingSignInButton"><Link to="/signin">Sign In</Link></button>
        </div>
        <div className="landingSignUp">
          <i className="fa fa-user-plus" aria-hidden="true"></i>
          <button id="landingSignUpButton"><Link to="/signup">Sign Up</Link></button>
        </div>
      </div>
    </div>
  )
}

export default Landing;
