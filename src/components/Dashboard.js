import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { createSelector } from 'reselect';
import getCurrentUser from '@selectors/getCurrentUser';
import GiverDashboard from '@components/Dashboards/Giver';

export class Dashboard extends PureComponent {

  constructor(props){
    super(props);
   
  }

  render() {
    const {user} = this.props;
    console.log(user);
    return (
      <div >
        {user.type=='giver'&&<GiverDashboard/>}
      </div>
    );
  }
}
const mapStateToProps =createSelector(
  getCurrentUser,
  (user) => ({
    user
  })
);

export default hot(module)(connect(mapStateToProps)(Dashboard));