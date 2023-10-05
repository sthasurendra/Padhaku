/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import { useEffect, useState, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const ConstumeDropdown = styled.div`
  position: absolute;
  top: 58px;
  width: 375px;
  transform: translateX(-45%);
  background-color: ${(props) => props.theme.pageBackground};
  border: 3px solid #00000012;
  border-radius: var(--border-radius);
  padding: 0 0.5rem;
  overflow: hidden;
  transition: height var(--speed) ease, background-color 300ms, color 300ms;
  z-index: 2;

  .custom-menu {
    width: 100%;
  }
`;

export default function DropdownMenu({ children, notification }) {
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);
  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  return (
    <ConstumeDropdown
      // css={css`
      //   height: ${menuHeight + 24}px;
      // `}
      className={`${notification ? 'notification' : ''}`}
      ref={dropdownRef}
      onClick={(e) => e.stopPropagation()}
    >
      <CSSTransition in={true} timeout={500} classNames="menu-primary" unmountOnExit onEnter={calcHeight}>
        <div className="costume-menu">{children}</div>
      </CSSTransition>
    </ConstumeDropdown>
  );
}
