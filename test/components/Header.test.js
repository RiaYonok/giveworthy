import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import snapshot from 'snap-shot-it';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import Header from 'Components/Header';

describe('<Header/>', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Header />);

    snapshot(toJson(wrapper));
  });
});