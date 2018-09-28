import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { createSelector } from 'reselect';
import getCurrentUser from '@selectors/getCurrentUser';
import GiverDashboard from '@components/Dashboards/Giver';
import CharityDashboard from '@components/Dashboards/Charity';
import AdminDashboard from '@components/Dashboards/Admin';

export class Dashboard extends PureComponent {

  constructor(props){
    super(props);
   
  }

  render() {
    const {user} = this.props;
    return (
      <div >
        {user.type=='giver'&&<GiverDashboard/>}
        {user.type=='charity'&&<CharityDashboard/>}
        {user.type=='admin'&&<AdminDashboard/>}
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