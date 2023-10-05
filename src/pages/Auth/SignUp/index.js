/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';

// styles
import { ViewDiv } from './styles/styles';
import { LinkButton } from '../../../_elements/button/Button';
import { SignUpContainer } from './styles/styles';
import { Mast } from '../../../_elements/container';

// Validator
import { regValidationSchema } from '../../../_helpers';

// helpers
import { fetchWrapper } from '../../../_helpers/fetchWrapper';

// Components
import SignUpStep0 from './Steps/SignUpStep0';
import SignUpStep1 from './Steps/SignUpStep1';
import SignUpStep2 from './Steps/SignUpStep2';
import SignUpStep3 from './Steps/SignUpStep3';
import ButtonContainer from './ButtonContainer';

const SignUp = () => {
  const history = useHistory();
  const {
    register,
    watch,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(regValidationSchema),
  });
  const [imageFile, setImageFile] = useState(null);

  const getImageResult = (image) => {
    console.log(image, 'IMAGE');
    setImageFile(image);
  };

  const onSubmit = async (data) => {
    if (stepCount === 3) {
      try {
        if (imageFile) {
          try {
            let avatar = new FormData();
            avatar.append('avatar', imageFile);
            await fetchWrapper.post('users/me/upload', avatar, 'image');
          } catch (err) {
            console.log(err);
            toast.error('Failed Updating Profile Picture !!');
          }
        }

        data.interest = JSON.parse(data.interest);
        await fetchWrapper.post('auth/register', data);
        history.push('/login');
        toast.success(`User Registered Successfully !!!`);
      } catch (err) {
        console.log(err);
        toast.error(err.message);
      }
    }
  };
  const handleNextPage = () => {
    setStepCount(stepCount + 1);
  };
  const handlePrevPage = () => {
    setStepCount(stepCount - 1);
  };
  const [stepCount, setStepCount] = useState(0);
  return (
    <ViewDiv className={'signUpBackground'}>
      <Mast></Mast>
      <SignUpContainer className={`${stepCount === 3 ? 'signuppage3Container' : ''}`}>
        <form
          css={css`
            overflow-y: auto;
          `}
        >
          {stepCount === 0 && <SignUpStep0 errors={errors} register={register} />}
          {stepCount === 1 && (
            <SignUpStep1
              errors={errors}
              register={register}
              getValues={getValues}
              getImageResult={getImageResult}
              image={imageFile}
            />
          )}
          {stepCount === 2 && <SignUpStep2 errors={errors} register={register} getValues={getValues} />}
          {stepCount === 3 && <SignUpStep3 register={register} setValue={setValue} getValues={getValues} />}
        </form>
        <ButtonContainer
          stepCount={stepCount}
          watch={watch}
          setValue={setValue}
          handleNextPage={handleSubmit(handleNextPage)}
          handlePrevPage={handleSubmit(handlePrevPage)}
          handleSubmit={handleSubmit}
          onSubmit={onSubmit}
        />
        <div className="infoContainer">
          <p>By continuing, you agree to Padhaku's Terms of Service, Privacy policy.</p>
          <p>
            Already a member?{' '}
            <Link to="/login">
              <LinkButton>Log in</LinkButton>
            </Link>
          </p>
        </div>
      </SignUpContainer>
    </ViewDiv>
  );
};

export default SignUp;
