/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const CustomToggleButtonCSS = css`
    position: relative;
    background: white;
    border-radius: 130px;
    width: 4rem;
    height: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  .toggleBall {
    background: #282c36;
    height: 1.8rem;
    width: 1.8rem;
    position: absolute;
    border-radius: 100%;
    border: 2px solid grey;
    transition: transform 200ms;
  }
`;
const CustomToggleButton = () => {
  return (
    <div css={CustomToggleButtonCSS}>
      <div className="toggleBall"></div>
    </div>
  );
};

export default CustomToggleButton;
