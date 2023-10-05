import React, { Fragment, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { IoCloseCircle } from 'react-icons/io5';
const Body = ({ children, show, onClose, className, style }) => {
  const modalRef = useRef(null);
  useEffect(() => {
    if (show) {
      modalRef.current.classList.add('visible');
    } else {
      modalRef.current.classList.remove('visible');
    }
  }, [show]);
  return (
    <div ref={modalRef} className="modal" onClick={onClose}>
      <div className={`modal__wrap ${className}`} style={style} onClick={(e) => e.stopPropagation()}>
        <Fragment>
          <div className="modal__head">
            <button onClick={onClose} className="modal__closebtn">
              <IoCloseCircle />
            </button>
          </div>
          {children}
        </Fragment>
      </div>
    </div>
  );
};

const Main = (props) => <MainStyle>{props.children}</MainStyle>;
const Button = (props) => <button onClick={props.onClick}>{props.children}</button>;

const MainStyle = styled.div`
  .modal {
    position: fixed;
    display: block;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 10000;
    overflow-x: hidden;
    background-color: rgba(31, 32, 41, 0.75);
    pointer-events: none;
    opacity: 0;
    transition: opacity 250ms 700ms ease;
  }

  .visible {
    pointer-events: auto;
    opacity: 1;
    transition: all 300ms ease-in-out;
  }

  .modal__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    display: block;
    width: 60vw;
    height: 60%;
    min-height: 400px;
    min-width: 400px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 4px;
    padding-bottom: 20px;
    background-color: #fff;
    align-self: center;
    box-shadow: 0 12px 25px 0 rgba(199, 175, 189, 0.25);
    opacity: 0;
    transform: scale(0.6);
    transition: opacity 250ms 250ms ease, transform 300ms 250ms ease;
    transform: scale(0);
    padding: 1rem;
  }

  .visible .modal__wrap {
    opacity: 1;
    transform: scale(1);
    transition: opacity 250ms 500ms ease, transform 350ms 500ms ease;
  }
  .modal__head {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .modal__closebtn {
    font-size: 24px;
    background: none;
    border: none;
    justify-content: center;
    align-items: center;
    display: flex;
    cursor: pointer;
    transition: transform 200ms;
    :hover {
      transform: scale(1.1);
    }
  }
  .titleHead {
    margin-bottom: 1.5rem;
  }
  .titleInput {
    font-size: 1.6rem;
    width: 80%;
    padding: 0 0.3rem;
  }

  .forumBody {
    height: 75%;
  }

  .demo-wrapper {
    height: 100% !important;
    overflow: scroll;
    .rdw-editor-main {
      height: 75%;
    }
  }
`;

export const PModal = { Main, Button, Body };
