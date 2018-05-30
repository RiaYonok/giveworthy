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
});