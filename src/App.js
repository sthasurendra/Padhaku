/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useEffect, Suspense } from 'react';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ToastContainer, Flip } from 'react-toastify';

// styles
import themes from './theme';
import 'react-toastify/dist/ReactToastify.css';

// helpers
import { ScrollToTop } from './_helpers';

//components
import { LoadingContainer } from './_elements/LoadingContainer';

// routes
import { routes, privateRoute, authRoute } from './routes';
import { NormalRoute, AuthRoute, PrivateRoute } from './_helpers';

// redux actions
import { getUserData } from './_redux/actions/ActionUser';

function App({ darkMode, getUserData, isLoading }) {
  useEffect(() => {
    getUserData();
  }, [getUserData]);
  return (
    <ThemeProvider theme={themes(darkMode)}>
      {isLoading ? (
        <LoadingContainer text="loading ..." />
      ) : (
        <Router>
          <ScrollToTop />
          <Switch>
            <Suspense fallback={<LoadingContainer text="loading ..." />}>
              {privateRoute.map((route) => (
                <PrivateRoute key={route.path} exact path={route.path} component={route.Component} />
              ))}

              {routes.map((route) => (
                <NormalRoute key={route.path} exact path={route.path} component={route.Component} />
              ))}

              {authRoute.map((route) => (
                <AuthRoute key={route.path} exact path={route.path} component={route.Component} />
              ))}
            </Suspense>
          </Switch>
        </Router>
      )}

      <ToastContainer
        position="top-right"
        autoClose={5000}
        transition={Flip}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.ui.darkMode,
  isLoggedIn: state.user.isLoggedIn,
  isLoading: state.user.isLoading,
});

export default connect(mapStateToProps, { getUserData })(App);
