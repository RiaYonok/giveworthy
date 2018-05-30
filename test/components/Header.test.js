import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Header from 'Components/Header';

describe('<Header/>', () => {
  it('should render top-level div', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('div.header-container')).to.have.length(1);
  });

  it('should render a second-level div', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('div.header')).to.have.length(1);
  });

  it('should render a logo div', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('div.logo')).to.have.length(1);
  });

  it('should render a logo', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('div.logo img')).to.have.length(1);
  });

  it('should render a navbar', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('div.header nav.main-navbar')).to.have.length(1);
  });

  it('should render 3 standard-options on navbar', () => {
    const wrapper = shallow(<Header />);

    expect(wrapper.find('div.header nav.main-navbar div.standard-option p')).to.have.length(3);
  });
});