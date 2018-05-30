import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import { MemoryRouter } from 'react-router';
import Enzyme, { shallow } from 'enzyme';
import { Route } from 'react-router';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Main from 'Components/Main';
import Header from 'Components/Header';
import Routes from 'Routes/index';

describe('<Main />', () => {
  it('should render top-level div', () => {
    const wrapper = shallow(<Main/>);
    expect(wrapper.find('div.main-container')).to.have.length(1);
  });

  it('should render Header', () => {
    const wrapper = shallow(<Main />);

    expect(wrapper.find(Header)).to.have.length(1);
  });

  it('should render Routes', () => {
    const wrapper = shallow(<Main />);

    expect(wrapper.find(Routes)).to.have.length(1);
  });
});