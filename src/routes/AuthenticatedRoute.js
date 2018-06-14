import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router';

import isUserAuthenticated from '@selectors/isUserAuthenticated';

export class AuthenticatedRoute extends PureComponent {
  render() {
    const { component: Component, isAuthenticated, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Component {...props} />
          ) : (
            <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
          )
        }
      />
    );
  }
}

export const mapStateToProps = createSelector(
  isUserAuthenticated,
  (isAuthenticated) => ({isAuthenticated})
);

export default connect(mapStateToProps)(AuthenticatedRoute);