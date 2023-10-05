import React, { useRef } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';

import Main from '../layouts/Main';

//redux
import { connect } from 'react-redux';
import { LoadingContainer } from '../_elements/LoadingContainer';

const PrivateRoute = ({ component: Component, roles, user, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (!isLoggedIn) {
        return <Redirect to="/login" />;
      }

      if (user) {
        return (
          <Main>
            <Component {...props} />
          </Main>
        );
      }
    }}
  />
);

const AuthRoute = ({ component: Component, isLoggedIn, isLoading, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isLoading ? <LoadingContainer /> : isLoggedIn ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

const NormalRoute = ({ component: Component, isLoggedIn, isLoading, ...rest }) => {
  const nodeRef = useRef(null);
  return (
    <Route
      {...rest}
      render={(props) => {
        return (
          <Main>
            <CSSTransition in={props.match != null} timeout={500} nodeRef={nodeRef} classNames="page" unmountOnExit>
              <div ref={nodeRef}>
                <Component {...props} />
              </div>
            </CSSTransition>
          </Main>
        );
      }}
    />
  );
};

PrivateRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
};

AuthRoute.propTypes = {
  isLoggedIn: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  isLoggedIn: state.user.isLoggedIn,
  isLoading: state.user.isLoading,
});

const ContainerCreater = connect(mapStateToProps);

const FirstConnectedComponent = ContainerCreater(PrivateRoute);
const SecondConnectedComponent = ContainerCreater(AuthRoute);
const ThirdConnectedComponent = ContainerCreater(NormalRoute);

export {
  FirstConnectedComponent as PrivateRoute,
  SecondConnectedComponent as AuthRoute,
  ThirdConnectedComponent as NormalRoute,
};
