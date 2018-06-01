import 'jsdom-global/register';
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import snapshot from 'snap-shot-it';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import App from 'Components/App';
import Main from 'Components/Main';

describe('<App />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<App />);
    snapshot(toJson(wrapper));
  });
});