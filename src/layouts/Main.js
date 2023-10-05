import React, { Fragment } from 'react';
// import Footer from './Footer/Footer';
import Header from './Header/Header';

const Main = ({ children }) => {
  return (
    <Fragment>
      <Header />
      {children}
      {/* <Footer /> */}
    </Fragment>
  );
};

export default Main;
