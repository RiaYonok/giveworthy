import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Login from 'Components/auth/Login';

describe('<Login />', () => {
  it('should have a top-level div', () => {
    const wrapper = shallow(<Login/>);

    expect(wrapper.find('div.login-container')).to.have.length(1);
  });

  it('should have a logins section', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.find('div.login-container div.login-buttons')).to.have.length(1);
  });

  it('should contain google login', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.find('div.login-container div.login-buttons .login-button.login-google div.login-icon')).to.have.length(1);
  });

  it('should render google login image in google login button', () => {
    const wrapper = shallow(<Login />);

    expect(wrapper.find('div.login-container div.login-buttons .login-button.login-google img')).to.have.length(1);
  });

  it('should contain a onGoogleSignIn function', () => {
    const wrapper = shallow(<Login />);

    expect(typeof wrapper.instance().onGoogleSignIn).to.equal('function');
  });

  it('should contain the correct props on google signin button', () => {
    const wrapper = shallow(<Login />);
    const func = wrapper.instance().onGoogleSignIn;

    expect(wrapper.find('.login-button.login-google').first().props()).to.deep.include({
      clientId: '1051526831495-k97buaru1epuj4h12s1h1pet8rqutirr.apps.googleusercontent.com',
      onSuccess: func,
      onFailure: func
    });
  });
});