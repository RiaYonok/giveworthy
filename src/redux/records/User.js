import { List, Record, fromJS } from 'immutable';
import moment from 'moment';

const shape = {
  id: null,
  givenName: null,
  familyName: null,
  email: null,
  gender: null,
  dob: null,
  role: 0,
  jwt: null,
  affiliatedOrgs: List(),
  createdAt: null,
  updatedAt: null
};

class UserRecord extends Record(shape) {
  static fromJS(pojo) {
    return new UserRecord({
      id: pojo.id || null,
      givenName: pojo.givenName || null,
      familyName: pojo.familyName || null,
      email: pojo.email || null,
      gender: pojo.gender || null,
      dob: pojo.dob ? moment.unix(+pojo.dob) : null,
      role: pojo.role ? +pojo.role : 0,
      jwt: pojo.jwt || null,
      affiliatedOrgs: pojo.affiliatedOrgs ? fromJS(pojo.affiliatedOrgs) : List(),
      createdAt: pojo.createdAt ? moment.unix(+pojo.createdAt) : null,
      updatedAt: pojo.updatedAt ? moment.unix(+pojo.updatedAt) : null
    });
  }
}

export default UserRecord;
