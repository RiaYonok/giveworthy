import 'jsdom-global/register';
import { expect } from 'chai';

import reducer, {reducers} from 'Redux/reducers/index';

describe('combined reducers', () => {
  it('should be a function', () => {
    expect(typeof reducer).to.equal('function');
  });

  it('should have the correct keys', () => {
    expect(reducers).to.have.keys(['users', 'errors', 'router']);
  });
});
