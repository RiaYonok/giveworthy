import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import snapshot from 'snap-shot-it';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import Home from 'Components/Home';

describe('<Home/>', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Home />);
    
    snapshot(toJson(wrapper));
  });
});