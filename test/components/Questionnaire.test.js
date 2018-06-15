import 'jsdom-global/register';
import { Map } from 'immutable';
import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from '@material-ui/core/Modal';
import snapshot from 'snap-shot-it';
import toJson from 'enzyme-to-json';
Enzyme.configure({ adapter: new Adapter() });

import {Questionnaire, mapStateToProps} from '@components/Questionnaire';

describe('<Questionnaire />', () => {
  it('should open model when they are equal', () => {
    const wrapper = shallow(
      <Questionnaire questionnaireName='test1' activeQuestionnaire='test1'>
        <div className="test"></div>
      </Questionnaire>
    );

    expect(wrapper.find(Modal).first().prop('open')).to.be.true;
  });

  it('should close modal then they are not equal', () => {
    const wrapper = shallow(
      <Questionnaire questionnaireName='test2' activeQuestionnaire='test1'>
        <div className="test"></div>
      </Questionnaire>
    );

    expect(wrapper.find(Modal).first().prop('open')).to.be.false;
  });
});

describe('mapStateToProps', () => {
  it('should return the correct state slices', () => {
    const fields = Map({
      field1: 'field1',
      field2: 'field2'
    });

    const state = {
      questionnaires: Map({
        activeQuestionnaire: 'test1',
        activePageNumber: 3,
        fields
      })
    };

    expect(mapStateToProps(state)).to.deep.equal({
      activeQuestionnaire: 'test1'
    });
  });
});