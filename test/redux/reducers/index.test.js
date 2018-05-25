import 'jsdom-global/register';
import { expect } from 'chai';

import reducer from 'Redux/reducers/index';

describe('combined reducers', () => {
  it('should be a function', () => {
    expect(typeof reducer).to.equal('function');
  });
});
