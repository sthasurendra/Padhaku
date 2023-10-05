import React from 'react';
import { TextLabelInput, PasswordInput } from '../../../../_elements/input/Input';
import { NamesContainer, FormContainer, SignUpStep0CSS, Hr } from './styles';

import { IoClose } from 'react-icons/io5';
import { useHistory } from 'react-router';

const SignUpStep0 = ({ errors, register, handleNextPage }) => {
  const history = useHistory();
  return (
    <SignUpStep0CSS>
      <div className="closeBtnDiv">
        <IoClose
          className="closeBtn"
          fontSize="2rem"
          onClick={() => {
            history.push('/');
          }}
        />
      </div>
      <div>
        <h1 className="heading">Welcome to Padhaku</h1>
        <p className="sub_heading">A platform for book lovers.</p>
      </div>
      <Hr />
      <FormContainer>
        <div>
          <NamesContainer>
            <TextLabelInput errors={errors} label="First Name" name="firstName" type="text" register={register} />
            <TextLabelInput errors={errors} label="Last Name" name="lastName" type="text" register={register} />
          </NamesContainer>
          <TextLabelInput
            errors={errors}
            label="Email"
            name="email"
            type="email"
            register={register}
            autoComplete="email"
          />
          <PasswordInput errors={errors} label="Password" name="password" type="password" register={register} />
          <PasswordInput
            errors={errors}
            label="Confirm Password"
            name="passwordConfirm"
            type="password"
            register={register}
          />
        </div>
      </FormContainer>
    </SignUpStep0CSS>
  );
};

export default SignUpStep0;
