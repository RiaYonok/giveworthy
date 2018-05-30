import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import App from 'Components/App';
import Main from 'Components/Main';

describe('<App />', () => {
  it('should have Provider', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Provider)).to.have.length(1);
  });

  it('should have ConnectedRouter', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(ConnectedRouter)).to.have.length(1);
  });

  it('should render Main', () => {
    const wrapper = shallow(<App />);

    expect(wrapper.find(Main)).to.have.length(1);
  });
});