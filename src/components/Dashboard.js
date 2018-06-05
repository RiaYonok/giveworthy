import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import User from 'Models/User';
import getCurrentUser from 'Redux/selectors/getCurrentUser';
import {formatCurrency, formatCount, formatPercentage} from 'Lib/formatter';
import test_logo from 'Images/if_male_628288.svg';

export class Dashboard extends PureComponent {
  render() {
    const { currentUser: 
      { 
        imageURL, 
        givenName,
        donationProfile: 
        {
          amountTotal,
          donations,
          percentile
        } 
      } 
    } = this.props;
    return (
      <div className="dashboard-container">
        <div className="dashboard">
          <div className="overview-container">
            <div className="overview">
              <div className="profile-image-container">
                <img src={imageURL || test_logo} />
              </div>
              <div className="recap-container">
                <h1>Hi, {givenName}!</h1>
                <div className="recap">
                  <div className="amount-container">
                    <div className="pre-text">You've given</div>
                    <div className="value">
                      {formatCurrency(amountTotal)}
                    </div>
                    <div className="post-text">to {formatCount(donations.count(), 'cause')}</div>
                  </div>
                  <div className="rank-container">
                    <div className="pre-text">You're in the top</div>
                    <div className="value">
                      {formatPercentage(percentile || 0, 0)}
                    </div>
                    <div className="post-text">Of givers in your age group</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const mapStateToProps = createSelector(
  getCurrentUser,
  (currentUser) => ({
    currentUser
  })
);

export default connect(mapStateToProps)(Dashboard);