// //core imports
import React from 'react';
import styled from 'styled-components';
import { categoriesImageMap } from '../../assests/img/Images';

export const SubmitButton = styled.button`
  background: #0066a2;
  color: white;
  text-shadow: none;
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.8);
  }
  &:active {
    transform: translateY(0px);
    box-shadow: none;
  }
`;

export const StyledButton = styled.button`
  text-shadow: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  outline: none;
  padding: 0.5em 1.6em;
  margin-right: 0.5em;
  border-radius: 8px;
  box-shadow: 0px 4px 2px 2px rgba(153, 153, 153, 0);
  font-family: 'Roboto', sans-serif;
  transition: transform 350ms, box-shadow 350ms;
  :hover {
    transform: translateY(-3px);
    box-shadow: 0px 4px 2px 2px rgba(153, 153, 153, 0.5);
  }
  :active {
    transform: translateY(0);
    box-shadow: 0px 4px 2px 2px rgba(153, 153, 153, 0);
  }
`;

export const StyledButtonPrimary = styled(StyledButton)`
  background-color: ${(props) => props.theme.titleColor};
  color: white;
`;
export const StyledButtonSecondary = styled(StyledButton)`
  background-color: #e6e6e6;
  color: #333;
`;

export const LinkButton = styled.button`
  border: none;
  outline: none;
  background: transparent;
  font-weight: bold;
  cursor: pointer;
  transition: color 300ms;
  font-family: 'Roboto', 'sans-serif';
  :hover {
    color: ${(props) => props.theme.titleColor};
  }
`;

const CategoryBtnCss = styled.div`
  position: relative;
  width: 8rem;
  height: 8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.4rem solid #bdbdbd5e;
  border-radius: 20px;
  font-size: 2rem;
  font-weight: bolder;
  cursor: pointer;
  overflow: hidden;
  transition: transform 300ms, box-shadow 240ms, border-color 200ms, color 200ms;

  &.selected {
    border-color: ${(props) => props.theme.titleColor};
    transform: translateY(-3%);
    box-shadow: 0 10px 12px 0px #0000003d;
    .overlay {
      background-color: #0000009a;
    }
  }
  :hover,
  :focus {
    transform: translateY(-3%);
    box-shadow: 0 10px 12px 0px #0000003d;
  }
  .image {
    display: block;
    width: 100%;
    transform: scale(2);
  }
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    transition: 0.5s ease;
    background-color: #00000061;
    :hover {
      background-color: #0000009a;
    }
  }

  .text {
    color: white;
    font-size: 1.2rem;
    position: absolute;
    top: 80%;
    left: 65%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    font-family: 'Roboto', sans-serif;
  }
  @media screen and (min-width: 900px) {
    width: 10rem;
    height: 10rem;
  }
`;

export const CategoryBtn = ({ category, handleClick = null }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const toggleSelected = () => {
    setIsSelected(!isSelected);
    if (handleClick) {
      handleClick(category);
    }
  };
  return (
    <CategoryBtnCss className={`h-${category} ${isSelected ? 'selected' : ''}`} onClick={toggleSelected}>
      <img src={categoriesImageMap[category]} alt={category} className="image" />
      <div className="overlay"></div>
      <div className="text">{category}</div>
    </CategoryBtnCss>
  );
};
