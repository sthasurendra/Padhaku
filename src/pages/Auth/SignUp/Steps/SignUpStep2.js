import React from 'react';
import { SignUpStep2CSS } from './styles';
import { TextLabelInput } from '../../../../_elements/input/Input';

const SignUpStep1 = ({ errors, register, getValues }) => {
  return (
    <SignUpStep2CSS>
      <div className="welcomInfo">
        <h1 className="heading">YOU!</h1>
        <TextLabelInput errors={errors} label="Date of Birth" name="dateOfBirth" type="date" register={register} />
        {/* <TextLabelInput errors={errors} label="Gender" name="gender" type="text" register={register} /> */}
        <TextLabelInput errors={errors} label="Phone Number" name="phoneNumber" type="tel" register={register} placeholder="98*********" />
      </div>
    </SignUpStep2CSS>
  );
};

export default SignUpStep1;
