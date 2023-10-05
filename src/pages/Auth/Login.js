/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

//elements
import {
  AuthInput,
  CheckBoxInput,
  CheckBoxLabel,
  CustomCheckboxCSS,
  PasswordInput,
  TextLabelInput,
} from '../../_elements';
import { StyledButtonPrimary } from '../../_elements/button/Button';

//components
import { loginUser } from '../../_redux/actions/ActionUser';
import { logValidationSchema } from '../../_helpers';

// assets
import { VscLoading } from 'react-icons/vsc';

const Login = ({ loginUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(logValidationSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    await loginUser(data, history);
    setIsLoading(false);
  };


  return (
    <div
      css={css`
        display: flex;
        height: 100vh;
        width: 100vw;
        background-image: linear-gradient(90deg, transparent 50%, #fafafa 50%, #fff 100%), url('/images/books.jpg');
        background-size: 100%;
      `}
    >
      <div
        css={css`
          width: 30%;
          @media screen and (min-width: 900px) {
            width: 50%;
          }
        `}
      ></div>
      <div
        css={css`
          width: 70%;
          background: white;
          display: grid;
          place-items: center;
          padding: 0 1rem;
          @media screen and (min-width: 900px) {
            width: 50%;
          }
        `}
      >
        <div
          css={css`
            max-width: 370px;
            width: 100%;
          `}
        >
          <h1
            css={css`
              text-align: center;
              margin: 1.5rem 0;
              color: #fb824e;
            `}
          >
            Log in to Padhaku
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div
              css={css`
                margin-bottom: 1rem;
              `}
            >
              <TextLabelInput label="Email" name="email" register={register} errors={errors} />
            </div>

            <div
              css={css`
                margin-bottom: 0.5rem;
              `}
            >
              <PasswordInput label="Password" name="password" errors={errors} register={register} />
            </div>
            <div
              css={css`
                margin: 1rem 0;
              `}
            >
              <CustomCheckboxCSS>
                <input type="checkbox" id="remember" />
                <span className="checkmark" htmlFor="remember"></span>
                <label
                  htmlFor="remeber"
                  css={css`
                    font-size: 1rem;
                  `}
                >
                  Remember me
                </label>
              </CustomCheckboxCSS>
            </div>
            <div
              css={css`
                text-align: center;
                width: 100%;
              `}
            >
              <StyledButtonPrimary>
                {isLoading ? (
                  <span css={css`
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}>
                    <VscLoading className="spin" />{' '}
                  </span>
                ) : (
                  <span>Login</span>
                )}
              </StyledButtonPrimary>
            </div>
            <p
              css={css`
                margin: 1rem 0;
                a {
                  color: #ff6602;
                }
              `}
            >
              Not a Padhaku yet? <Link to="/signup">Join us</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default connect(null, { loginUser })(Login);
