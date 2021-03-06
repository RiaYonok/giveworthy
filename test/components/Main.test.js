import 'jsdom-global/register';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import snapshot from 'snap-shot-it';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import Main from '@components/Main';

describe('<Main />', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<Main />);

    snapshot(toJson(wrapper));
  });
});