/** @jsx jsx */
import { jsx } from '@emotion/core';
import { ButtonContainerCSS } from './styles/styles';
import { StyledButtonPrimary, StyledButtonSecondary } from '../../../_elements/button/Button';
import { Fragment } from 'react';

const ButtonContainer = ({ stepCount, watch, handleSubmit, handleNextPage, handlePrevPage, onSubmit }) => {
  let interestNo = watch('interest') ? JSON.parse(watch('interest')).length : 0;
  return (
    <ButtonContainerCSS>
      {stepCount !== 0 && stepCount !== 3 && (
        <StyledButtonSecondary onClick={handlePrevPage}>Back</StyledButtonSecondary>
      )}
      {stepCount === 3 ? (
        <Fragment>
          {interestNo < 5 ? (
            <StyledButtonSecondary disabled={true}>Pick atleast 5</StyledButtonSecondary>
          ) : (
            <StyledButtonPrimary onClick={handleSubmit(onSubmit)}>Sign Me Up</StyledButtonPrimary>
          )}
        </Fragment>
      ) : (
        <StyledButtonPrimary onClick={handleNextPage}>Continue</StyledButtonPrimary>
      )}
    </ButtonContainerCSS>
  );
};
export default ButtonContainer;
