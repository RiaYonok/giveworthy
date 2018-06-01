const jwt = require('jsonwebtoken');
const Immutable = require('immutable');

const users = Immutable.fromJS([
  {
    id: '449f555d-372a-46b5-9e35-db9c3dbe6f0c',
    givenName: 'Austin',
    familyName: 'Benesh',
    email: 'austin.d.benesh@gmail.com',
    gender: 'male',
    dob: 624499200,
    role: 2,
    affiliatedOrgs: [],
    createdAt: 1527788770,
    updatedAt: 1527788770
  }
]);

const login = jwt.sign(users.first().toJS(), 'secret');

module.exports = () => {

  return { users: users.toJS(), login: users.first().set('jwt', login).toJS() };
};