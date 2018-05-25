import 'jsdom-global/register';
import { expect, use } from 'chai';
import Immutable, { List } from 'immutable';
import chaiImmutable from 'chai-immutable';
import moment from 'moment';

import User from 'Redux/records/User';

use(chaiImmutable);

describe('User immutablejs record', () => {
  const myUser = new User;
  it('should have the right keys', () => {
    expect(myUser).to.have.keys([
      'givenName', 
      'familyName', 
      'email',
      'gender', 
      'dob', 
      'role',
      'affiliatedOrgs',
      'createdAt',
      'updatedAt'
    ]);
  });

  it('should set givenName to null', () => {
    expect(myUser.givenName).to.be.null;
  });

  it('should set familyName to null', () => {
    expect(myUser.familyName).to.be.null;
  });

  it('should set email to be null', () => {
    expect(myUser.email).to.be.null;
  });

  it('should set gender to be null', () => {
    expect(myUser.gender).to.be.null;
  });

  it('should set dob to be null', () => {
    expect(myUser.dob).to.be.null;
  });

  it('should set role to be 0', () => {
    expect(myUser.role).to.equal(0);
  });

  it('should set affiliatedOrgs to be empty List', () => {
    expect(Immutable.is(List(), myUser.affiliatedOrgs)).to.be.true;
  });

  it('should set createdAt to be null', () => {
    expect(myUser.createdAt).to.be.null;
  });

  it('should set updatedAt to be null', () => {
    expect(myUser.updatedAt).to.be.null;
  });
});

describe('User immutable record fromJS method', () => {
  it('should set basic strings correctly', () => {
    const _myUser = {
      givenName: 'Austin', 
      familyName: 'Benesh',
      email: 'austin.d.benesh@gmail.com',
      gender: 'male'
    };

    const myUser = User.fromJS(_myUser);

    expect(Immutable.is(myUser,
      new User({
        givenName: 'Austin', 
        familyName: 'Benesh',
        email: 'austin.d.benesh@gmail.com',
        gender: 'male'
      })
    )).to.be.true;
  });

  it('should set dob to a moment object from a unix timestamp', () => {
    const _myUser = {
      dob: 111111111
    };

    const myUser = User.fromJS(_myUser);

    expect(Immutable.is(myUser,
    new User({
      dob: moment.unix(111111111)
    })
  )).to.be.true;
  });

  it('should set role to 0 if null', () => {
    const _myUser = {
      role: null
    };

    const myUser = User.fromJS(_myUser);

    expect(Immutable.is(myUser,
      new User({
        role: 0
      })
    )).to.be.true;
  });

  it('should set role to number', () => {
    const _myUser = {
      role: '1'
    };

    const myUser = User.fromJS(_myUser);

    expect(Immutable.is(myUser,
      new User({
        role: 1
      })
    )).to.be.true
  });

  it('should set affiliatedOrgs if array', () => {
    const _myUser = {
      affiliatedOrgs: [1, 2, 3]
    };

    const myUser = User.fromJS(_myUser);

    expect(Immutable.is(myUser,
      new User({
        affiliatedOrgs: List([1, 2, 3])
      })
    )).to.be.true;
  });

  it('should set affiliatedOrgs if immutable List', () => {
    const _myUser = {
      affiliatedOrgs: List([1, 2, 3])
    };

    const myUser = User.fromJS(_myUser);

    expect(Immutable.is(myUser,
      new User({
        affiliatedOrgs: List([1, 2, 3])
      })
    )).to.be.true;
  });

  it('should set createdAt to be moment object from unix timestamp', () => {
    const _myUser = {
      createdAt: '111111111111'
    };

    const myUser = User.fromJS(_myUser);

    expect(Immutable.is(myUser,
      new User({
        createdAt: moment.unix(111111111111)
      })
    )).to.be.true;
  });

  it('should set updatedAt to be moment object from unix timestamp', () => {
    const _myUser = {
      updatedAt: '111111111111'
    };

    const myUser = User.fromJS(_myUser);

    expect(Immutable.is(myUser,
      new User({
        updatedAt: moment.unix(111111111111)
      })
    )).to.be.true;
  });
});


