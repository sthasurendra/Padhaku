import styled from 'styled-components';

export const Container = styled.div`
  background-color: #18191a;
  height: calc(100% - 55px);
  width: 100%;
  overflow: hidden;
`;

export const Navigation = styled.div`
  width: 100%;
  height: 45px;
  background: #3a3b3c;
  position: fixed;
  ul {
    list-style: none;
    display: flex;
    height: inherit;
    color: grey;
  }
`;

export const NavigationLink = styled.li`
  align-items: center;
  display: flex;
  height: 100%;
  margin: 0 1rem;
  border-bottom: 5px solid black;
  cursor: pointer;
  font-weight: bold;
  color: white;
`;

export const ContentDiv = styled.div`
  height: 100vh;
  display: flex;
  background: #eee;
  padding: 5rem 2rem;
  overflow: auto;
`;

export const ForumCard = styled.div`
  display: flex;
  background: white;
  padding: 1rem 0.5rem 1rem 1rem;
  margin-bottom: 2px;
`;

export const FixedButton = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  height: 5rem;
  background-color: orange;
  border-radius: 1000px;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 9999;

  transition: transform 150ms;
  transform-origin: 50% 50%;
  :hover {
    transform: scale(1.1);
  }
  :active {
    transform: scale(0.9);
  }

  @media screen and (min-width: 900px) {
    width: 6rem;
    height: 6rem;
    bottom: 3rem;
    right: 3rem;
  }
  &.tooltip:hover:after {
    top: -45% !important;
  }
`;
