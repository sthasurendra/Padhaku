import React, { useState, useRef, Fragment } from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import 'react-step-progress-bar/styles.css';
import { ProgressBar, Step } from 'react-step-progress-bar';
import { CSSTransition } from 'react-transition-group';
import { StyledButtonSecondary, StyledButtonPrimary } from '../_elements/button/Button';
import { useHistory } from 'react-router-dom';

//components
import Step0 from '../components/AddBookForm/Step0';
import Step1 from '../components/AddBookForm/Step1';
import Step2 from '../components/AddBookForm/Step2';
import Step3 from '../components/AddBookForm/Step3';
import Step4 from '../components/AddBookForm/Step4';

//helpers
import { fetchWrapper } from '../_helpers';
import { toast } from 'react-toastify';
import { VscLoading } from 'react-icons/vsc';

const StyledAddBook = styled.div`
  background-color: ${(props) => (props.theme.theme === 'dark' ? props.theme.pageBackground : 'orange')};
  color: ${(props) => props.theme.primaryColor || 'black'};
  min-height: calc(100vh - 55px);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 200ms;
  .loadingDiv {
    position: absolute;
    width: 100%;
    background: rgba(255, 255, 255, 0.4);
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
  }
  .AddBookDiv {
    position: relative;
    background-color: ${(props) => (props.theme.theme === 'dark' ? props.theme.bg_secondaryColor : 'white')};
    padding: 2rem 1rem 1rem;
    height: 90vh;
    width: 90%;
    display: flex;
    flex-direction: column;

    @media screen and (min-width: 900px) {
      width: 70%;
    }

    .stepperDiv {
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: center;
      .stepdiv {
        width: 90%;
      }
    }
    .formDiv {
      height: 80%;
      overflow: hidden;

      > div {
        height: 100%;
      }
    }
    .buttonDiv {
      height: 10%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2em;
    }
  }
`;
const StyledStepper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  div {
    color: ${(props) => (props.accomplished ? '#f0f0f0' : '#fa6838')};
    font-size: 1.1rem;
    background: ${(props) => (props.accomplished ? '#fa6838' : '#f0f0f0')};
    border: 0.2rem solid ${(props) => (props.accomplished ? '#f0f0f0' : '#fa6838')};
    border-radius: 1000px;
    width: 3rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: fantasy;
    transition: background-color 300ms, border-color 300ms;
  }
  p {
    color: gray;
    width: 5em;
    position: absolute;
    top: 110%;
    text-align: center;
    font-size: 0.8rem;
  }
`;
const StepperCount = ({ count, message, accomplished }) => {
  return (
    <StyledStepper accomplished={accomplished}>
      <div>{count}</div>
      <p>{message}</p>
    </StyledStepper>
  );
};
const AddBook = ({ user }) => {
  const nodeRef = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [stepCount, setStepCount] = useState(0);
  const [errors, setErrors] = useState({});
  const percent = stepCount * 25;

  const { register, getValues, setValue, handleSubmit } = useForm({
    mode: 'onBlur',
  });

  const onSubmit = (data) => {
    const addBookData = async () => {
      console.log(data);
      setIsLoading(true);
      let bookData = new FormData();

      bookData.append('title', data.bookTitle);
      bookData.append('author', data.author);
      bookData.append('publication', data.publication);
      bookData.append('genre', data.genre);
      bookData.append('description', data.description);
      bookData.append('rating', data.rating);
      bookData.append('review', data.review);
      bookData.append('image', data.bookImage[0]);

      // Display the key/value pairs
      // for (var pair of bookData.entries()) {
      //   console.log(pair[0] + ', ' + pair[1]);
      // }

      try {
        let response = await fetchWrapper.post(`book`, bookData, true);
        console.log(response, 'response');
        let book = response.data;
        let userBookData = new FormData();
        userBookData.append('book', book._id);
        userBookData.append('user', user._id);
        userBookData.append('description', data.description);
        userBookData.append('price', JSON.parse(data.price));
        userBookData.append('condition', data.condition);
        userBookData.append('isNegotiable', data.isNegotiable ? true : false);
        userBookData.append('dateofbought', new Date(data?.boughtDate).toISOString());
        for (const key of Object.keys(data.userbookImage)) {
          userBookData.append('image', data.userbookImage[key]);
        }

        // Display the key/value pairs
        // for (var pair of userBookData.entries()) {
        //   console.log(pair[0] + ', ' + pair[1]);
        // }
        let userBookResponse = await fetchWrapper.post(`userBook/add`, userBookData, true);
        let resultUserBook = userBookResponse.data.data;
        toast.success('Book is successfully added');
        history.push(`/book/${resultUserBook._id}`);
        setIsLoading(false);
      } catch (err) {
        toast.error(err.message);
        setIsLoading(false);
        console.log(err, 'ERROR add book');
      }
    };

    addBookData();
  };

  const handleNextPage = (e) => {
    if (e) {
      e.preventDefault();
    }

    switch (stepCount) {
      case 0:
        if (getValues('bookTitle') !== '') {
          setStepCount(stepCount + 1);
          return;
        } else {
          setErrors({ bookTitle: 'Please enter name of the book you want to search' });
        }
        break;
      default:
        setStepCount(stepCount + 1);
    }
    console.log(stepCount, 'StepCount');
  };

  const handlePrevPage = (e) => {
    if (e) {
      e.preventDefault();
    }
    setStepCount(stepCount - 1);
  };

  const steps = ['Search Book Title', 'Your Book', 'Book Info', 'Your Book Info', 'Preview'];

  return (
    <StyledAddBook>
      <div className="container AddBookDiv">
        <div className="stepperDiv">
          <div className="stepdiv">
            <ProgressBar percent={percent} filledBackground="linear-gradient(to right, orange, #fa6838)">
              {steps.map((step, idx) => (
                <Step key={idx}>
                  {({ accomplished }) => <StepperCount message={step} accomplished={accomplished} count={idx + 1} />}
                </Step>
              ))}
            </ProgressBar>
          </div>
        </div>
        {isLoading && (
          <div className="loadingDiv">
            <VscLoading className="spin" fontSize={130} />
          </div>
        )}
        <form className="formDiv">
          <CSSTransition in={stepCount === 0} timeout={500} nodeRef={nodeRef} classNames="page" unmountOnExit>
            <div ref={nodeRef}>
              <Step0 register={register} handleNextPage={handleNextPage} errors={errors} />
            </div>
          </CSSTransition>
          <CSSTransition in={stepCount === 1} timeout={500} nodeRef={nodeRef} classNames="page" unmountOnExit>
            <div ref={nodeRef}>
              <Step1 register={register} handleNextPage={handleNextPage} getValues={getValues} setValue={setValue} />
            </div>
          </CSSTransition>
          <CSSTransition in={stepCount === 2} timeout={500} nodeRef={nodeRef} classNames="page" unmountOnExit>
            <div ref={nodeRef}>
              <Step2 register={register} getValues={getValues} setValue={setValue} errors={errors} />
            </div>
          </CSSTransition>
          <CSSTransition in={stepCount === 3} timeout={500} nodeRef={nodeRef} classNames="page" unmountOnExit>
            <div ref={nodeRef}>
              <Step3 register={register} getValues={getValues} setValue={setValue} errors={errors} />
            </div>
          </CSSTransition>
          <CSSTransition in={stepCount === 4} timeout={500} nodeRef={nodeRef} classNames="page" unmountOnExit>
            <div ref={nodeRef}>
              <Step4 register={register} getValues={getValues} setValue={setValue} errors={errors}/>
            </div>
          </CSSTransition>
        </form>
        <div className="buttonDiv">
          {stepCount === 0 ? (
            <StyledButtonSecondary
              onClick={() => {
                setStepCount(0);
                history.push('/');
              }}
            >
              Cancel
            </StyledButtonSecondary>
          ) : (
            <Fragment>
              <StyledButtonSecondary onClick={handlePrevPage}>Back</StyledButtonSecondary>
              {stepCount === 4 ? (
                <StyledButtonPrimary onClick={handleSubmit(onSubmit)}>
                  {isLoading ? <VscLoading class="spin" /> : 'Add Book'}
                </StyledButtonPrimary>
              ) : (
                <StyledButtonPrimary onClick={handleNextPage}>Next</StyledButtonPrimary>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </StyledAddBook>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

export default connect(mapStateToProps, {})(AddBook);
