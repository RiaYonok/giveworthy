import 'jsdom-global/register';
import React from 'react';
import { Map } from 'immutable';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Redirect, Route, MemoryRouter } from 'react-router';
import { expect } from 'chai';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import {AuthenticatedRoute, mapStateToProps} from 'Routes/AuthenticatedRoute';
import Dashboard from 'Components/Dashboard';

describe('<AuthenticatedRoute />', () => {
  it('should return redirect if isAuthenticated is false', () => {
    const wrapper = mount(
      <MemoryRouter>
        <AuthenticatedRoute path='/' exact={true} strict={false} component={Dashboard} isAuthenticated={false} />
      </MemoryRouter>
    );

    expect(wrapper.find(Redirect).first().prop('to')).to.include({pathname: '/login'});
  });

  it('should return component if isAuthenticated is true', () => {
    const wrapper = mount(
      <MemoryRouter>
        <AuthenticatedRoute path='/' exact={true} strict={false} component={Dashboard} isAuthenticated={true} />
      </MemoryRouter>
    );

    expect(wrapper.find(Dashboard)).to.have.length(1);
  });
});

describe('mapStateToProps', () => {
  it('should be a function', () => {
    expect(typeof mapStateToProps).to.equal('function');
  });

  const state = {
    users: Map()
  };

  it('should return an object with the correct keys', () => {
    expect(mapStateToProps(state)).to.have.keys(['isAuthenticated']);
  });
});