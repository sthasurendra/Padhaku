import React from 'react';
import { SignUpStep1CSS } from './styles';
import ProfilePicComponent from '../../../../_elements/ProfilePicComponent';

const SignUpStep1 = ({ register, getValues, getImageResult, image }) => {
  let userName = getValues('firstName');
  return (
    <SignUpStep1CSS>
      <div className="profilePicContainer">
        <ProfilePicComponent
          name={`${userName} ${getValues('lastName')}`}
          getImageResult={getImageResult}
          image={image}
        />
        <div className="emailDiv">{getValues('email') || 'awesome@padhaku.com'}</div>
      </div>
      <div className="welcomInfo">
        <h1 className="heading">Welcome to Padhaku</h1>
        <div className="nameDiv">{userName || 'Padhaku'}!</div>
        <div className="greeting">It's great to have you.</div>
        <div className="instruction">
          Please answer the next few questions, it will help us find the right books for you.
        </div>
      </div>
    </SignUpStep1CSS>
  );
};

export default SignUpStep1;
