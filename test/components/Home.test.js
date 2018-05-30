import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Home from 'Components/Home';

describe('<Home/>', () => {
  it('should render a top-level div', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find('div.home-container')).to.have.length(1);
  });
});