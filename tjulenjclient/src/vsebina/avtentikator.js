import React from 'react';
import { Route, redirect } from 'react-router-dom';

const Avtentikator = ({ component: Component, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
            redirect("/login")
        )
      }
    />
  );
};

export default Avtentikator;