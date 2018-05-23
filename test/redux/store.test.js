import { expect } from 'chai';
import store from 'Redux/store';

describe('redux store', () => {
  it('should have getState function', () => {
    expect(typeof store.getState).to.equal('function');
  });

  it('should have dispatch function', () => {
    expect(typeof store.dispatch).to.equal('function');
  });

  it('should have replaceReducer function', () => {
    expect(typeof store.replaceReducer).to.equal('function');
  });

  it('should have subscribe function', () => {
    expect(typeof store.subscribe).to.equal('function');
  });
});