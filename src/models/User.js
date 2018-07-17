import { List, Record, fromJS } from 'immutable';
import moment from 'moment';

import DonationProfile from '@models/DonationProfile';

const shape = {
  id: null,
  givenName: null,
  familyName: null,
  fullName:null,
  email: null,
  password:null,
  gender: null,
  dob: null,
  role: 0,
  jwt: null,
  affiliatedOrgs: List(),
  donationProfile: new DonationProfile,
  imageURL: null,
  createdAt: null,
  updatedAt: null,
  zipcode:null,
  note:null
};

class User extends Record(shape) {
  static fromJS(pojo) {
    return new User({
      id: pojo.id || null,
      givenName: pojo.givenName || null,
      familyName: pojo.familyName || null,
      fullName:pojo.fullName,
      email: pojo.email || null,
      password: pojo.password || null,
      gender: pojo.gender || null,
      dob: pojo.dob ? moment.unix(+pojo.dob) : null,
      role: pojo.role ? +pojo.role : 0,
      jwt: pojo.jwt || null,
      affiliatedOrgs: pojo.affiliatedOrgs ? fromJS(pojo.affiliatedOrgs) : List(),
      donationProfile: pojo.donationProfile || new DonationProfile,
      imageURL: pojo.imageURL || null,
      createdAt: pojo.createdAt ? moment.unix(+pojo.createdAt) : null,
      updatedAt: pojo.updatedAt ? moment.unix(+pojo.updatedAt) : null,
      zipcode:pojo.zipcode ||null,
      note:pojo.note ||null
    });
  }
}

export default User;