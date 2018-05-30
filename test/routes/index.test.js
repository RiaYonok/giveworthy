import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { MemoryRouter } from 'react-router';
import Enzyme, { shallow } from 'enzyme';
import { Route, Redirect, Switch } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Routes from 'Routes/index';

import Home from 'Components/Home';

describe('<Routes />', () => {
  it('should render top-level div', () => {
    const wrapper = shallow(<Routes/>);

    expect(wrapper.find('div')).to.have.length(1);
  });

  it('should render 1 route', () => {
    const wrapper = shallow(<Routes />);

    expect(wrapper.find(Route)).to.have.length(1);
  });

  it('should render route: /', () => {
    const wrapper = shallow(<Routes />);

    expect(wrapper.find(Route).first().props()).to.deep.equal({
      path: '/',
      exact: true,
      component: Home
    });
  });
});