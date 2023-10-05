import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

//Component
import HomeCarousel from '../components/HomeCarousel';
import HomeCategorySection from '../components/HomeCategorySection';
import HomeAllCategorySection from '../components/HomeAllCategorySection';

const StyledHome = styled.div`
  background-color: ${(props) => props.theme.pageBackground || 'white'};
  color: ${(props) => props.theme.color || 'black'};
  min-height: calc(100% - 55px);
  transition: background-color 250ms;
  display: flex;
  flex-direction: column;

  .tooltip:hover:after {
    top: -35%;
    left: 45px;
    width: 100px;
  }
  .FixedButton {
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
    a {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @media screen and (min-width: 900px) {
      width: 6rem;
      height: 6rem;
      bottom: 3rem;
      right: 3rem;
    }
  }
`;

const StyledCTA = styled.div`
  background-color: ${(props) => (props.theme.theme === 'dark' ? props.theme.secondaryColor : props.theme.titleColor)};
  color: ${(props) => (props.theme.theme === 'dark' ? props.theme.primaryColor : props.theme.pageBackground)};
  min-height: 50vh;
  transition: background-color 250ms;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3em 1.5em;
  @media screen and (min-width: 900px) {
    padding: 5em 6em;
  }
  h2 {
    font-size: 3rem;
    font-family: 'Roboto', sans-serif;
    margin-bottom: 0.5em;
    @media screen and (min-width: 900px) {
      font-size: 5rem;
    }
  }
  p {
    font-size: 1.2rem;
    width: 75%;
    margin: 0 auto;
    @media screen and (min-width: 900px) {
      font-size: 1.8rem;
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  background-color: white;
  /* font-weight: bold; */
  font-family: 'Roboto', sans-serif;
  letter-spacing: 0.1rem;
  border-radius: 1000px;
  border: none;
  outline: none;
  transition: transform 300ms, box-shadow 240ms;
  color: ${(props) => props.theme.titleColor || 'black'};
  padding: 1em 2em;
  margin: 1.5em;
  font-size: 1.2rem;
  :hover {
    transform: translateY(-4%);
    box-shadow: 0 10px 12px 0px #0000003d;
  }
  :active {
    transform: scaleX(1.2);
  }
  @media screen and (min-width: 900px) {
    padding: 1em 2em;
    margin: 1.5em;
    font-size: 1.8rem;
  }
`;

const Home = ({ user }) => {
  return (
    <StyledHome>
      <div className="MainHeader">
        <HomeCarousel />
      </div>

      <div className="container">
        <HomeCategorySection title="Newly Added" />
      </div>
      <StyledCTA>
        <h2>About Padhaku</h2>
        <p>
          Padhaku is a dedicated reader, who loves to read and share their knowledge and tools with other for
          empowerment of one another. It is a classification of intellectual peoples. It is a platform to connect with
          Padhakus, share books, ideas and interests.
        </p>
      </StyledCTA>
      <div className="container">
        <HomeCategorySection title="Explore" seeMore={true} shuffle={true} />
      </div>
      {user.isLoggedIn && (
        <div className="container">
          <HomeCategorySection title="For You" seeMore={true} shuffle={true} />
        </div>
      )}

      {user.isLoggedIn ? (
        <StyledCTA>
          <h2>Welcome Pakhadu</h2>
          <div>
            <p>We are very happy to have you join us, It is great pleasure to have you.</p>
            <div>
              <Link to="/category/myth">
                <Button>Check out Book about Myth</Button>
              </Link>
            </div>
          </div>
        </StyledCTA>
      ) : (
        <StyledCTA>
          <h2>Become a Pakhadu</h2>
          <div>
            <p>Sign up to see personalized recommendations and be a part of our Community.</p>
            <div>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </StyledCTA>
      )}

      <div className="container">
        <HomeAllCategorySection />
      </div>
      {user.isLoggedIn && (
        <div className="FixedButton tooltip" data-tooltip="Add Book">
          <NavLink exact to="/add-book">
            <FaPlus />
          </NavLink>
        </div>
      )}
    </StyledHome>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, null)(Home);
