import 'jsdom-global/register';
import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

import App from 'Components/App';

describe('<App />', () => {
  it('should render a div', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('div.app')).to.have.length(1);
  });
});