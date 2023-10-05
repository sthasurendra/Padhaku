/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import styled from 'styled-components';
import Rating from 'react-rating';

import { HiOutlineHeart, HiHeart } from 'react-icons/hi';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const HeartIcon = css`
  color: #fa6838;
  font-size: 2.5rem;
`;

export const AuthInput = styled.input`
  outline: none;
  width: 90%;
  border: 2px solid #474747;
  font-size: 1.2rem;
  padding: 0.3rem 0.6rem;
  display: block;
  transition: all 0.3s;
  margin-top: 5px;
  border-radius: 6px;
  &:focus {
    border-color: green;
    transition: 0.3s;
  }
  .invalid {
    border-color: red;
  }
`;

export const CheckBoxInput = styled.input`
  padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;
`;

export const CheckBoxLabel = styled.label`
  position: relative;
  cursor: pointer;

  &:before {
    content: '';
    -webkit-appearance: none;
    background-color: #57be27;
    border-radius: 4px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 10px;
    display: inline-block;
    position: relative;
    vertical-align: middle;
    cursor: pointer;
    margin-right: 5px;
  }

  input:checked + &:after {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 7px;
    width: 6px;
    height: 14px;
    border: solid #ffffff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }
`;

export const TextLabelInputCSS = styled.label`
  display: flex;
  flex-direction: column;
  padding: 0.3em;
  text-align: left;
  flex: 1;

  .errorMsg_span {
    font-size: 0.8rem;
    color: #ff1b1b;
  }
  &.d-block {
    display: block;
  }
  span {
    color: #383838;
    font-family: 'Roboto';
    margin-bottom: 0.5em;
  }
  .customCheckbox_span {
    width: fit-content;
    margin-right: 1em;
  }
  .customInput {
    font-size: 1.2rem;
    padding: 0.3em;
    outline: none;
    width: 100%;
    border-radius: 5px;
    transition: border-color 300ms;
    border: #dadada solid 2px;
    &.border {
      border: 2px solid #b9b9b9;
    }
    :focus {
      border-color: #fa6838;
    }
  }
`;

export const TextLabelInput = ({ errors = {}, label, className, name, type = 'text', register, disabled = false, placeholder="" }) => {
  return (
    <TextLabelInputCSS>
      <span>{label}</span>
      <input className={`customInput ${className}`} name={name} type={type} {...register(name)} disabled={disabled} placeholder={placeholder}/>
      {errors[name] && <span className="errorMsg_span">{errors[name].message}</span>}
    </TextLabelInputCSS>
  );
};


const PasswordInputCSS = styled(TextLabelInputCSS)`
  .pass-wrapper {
    position: relative;
    display: flex;
  }

  i {
    position: absolute;
    top: 22%;
    right: 3%;
    font-size: 1.3em;
    transition: color 200ms;
  }
  i:hover {
    color: ${(props) => props.theme.titleColor};
    cursor: pointer;
  }
`;

export const PasswordInput = ({ errors = {}, label, className, name, register, disabled = false }) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };
  return (
    <PasswordInputCSS>
      <span>{label}</span>

      <div className="pass-wrapper">
        <input
          className={`customInput ${className}`}
          name={name}
          type={passwordShown ? 'text' : 'password'}
          {...register(name)}
          disabled={disabled}
          autoComplete="new-password"
        />

        <i onClick={togglePasswordVisiblity}>{passwordShown ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}</i>
      </div>
      {errors[name] && <span className="errorMsg_span">{errors[name].message}</span>}
    </PasswordInputCSS>
  );
};

export const PrependInput = styled(TextLabelInputCSS)`
  width: 100%;
  display: block;
  padding: 0;
  .prepend_span {
    width: 10%;
    display: inline-block;
    background: white;
    font-size: 1.2rem;
    padding: 0.27em;
    border: 2px solid #b9b9b9;
    border-radius: 5px;
    border-right: none;
    border-top-right-radius: 0px;
    text-align: center;
    border-bottom-right-radius: 0px;
  }
  .customInput {
    border-top-left-radius: 0;
    width: 90%;
    border-bottom-left-radius: 0;
    &.p-0 {
      padding: 0;
    }
  }
`;

export const CustomCheckboxCSS = styled.label`
  display: inline;
  position: relative;
  padding-left: 35px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .errorMsg_span {
    font-size: 0.8rem;
    color: #ff1b1b;
  }
  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    margin-bottom: 12px;
    border: 1px solid #b9b9b9;
    border-radius: 5px;
  }

  /* On mouse-over, add a grey background color */
  :hover input ~ .checkmark {
    background-color: orange;
  }

  /* When the checkbox is checked, add a blue background */
  input:checked ~ .checkmark {
    background-color: #fa6838;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

export const CustomRater = ({ errors = {}, label, initialRating, onChangeHandler }) => {
  return (
    <TextLabelInputCSS>
      <span>{label}</span>
      <Rating
        initialRating={initialRating}
        emptySymbol={[<HiOutlineHeart css={HeartIcon} />]}
        fullSymbol={[<HiHeart css={HeartIcon} />]}
        onChange={onChangeHandler}
      />
    </TextLabelInputCSS>
  );
};

export const HiddenInput = styled.input`
  opacity: 0 !important;
  position: absolute !important;
  user-select: none;
`;
