import React from 'react';


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
      <button id="signInButton" onClick="location.href='/signin'">Sign In</button>
      <button id="signupButton" onClick="location.href='/signup'">Sign Up</button>
    </div>
  )
}

export default Landing;
