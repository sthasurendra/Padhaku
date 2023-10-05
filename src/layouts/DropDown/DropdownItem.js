/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import React from 'react';
import styled from 'styled-components';

const CustomMenuItem = styled.span`
  display: flex;
  align-items: center;
  border-radius: var(--border-radius);
  transition: background-color 350ms, color 350ms;
  padding: 0.5rem;
  color: ${(props) => props.theme.primaryColor} !important;
  text-decoration: none !important;
  font-size: 1.5rem;
  font-weight: 700;
  margin: 5px 0;
  .icon-button {
    margin-right: 0.5rem;
  }
  .icon-button:hover {
    filter: none;
  }
  :hover {
    background-color:  ${(props) => props.theme.bg_secondaryColor} !important;
  }
`;
export default function DropdownItem(props) {
  return (
    <CustomMenuItem href={props.goto}>
      <span
        className="icon-circle"
        css={css`
          margin-right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        `}
      >
        {props.leftIcon}
      </span>
      {props.children}
    </CustomMenuItem>
  );
}
