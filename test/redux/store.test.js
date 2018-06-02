import 'jsdom-global/register';
import { expect } from 'chai';
import * as redux from 'redux';
import configureStore, {middleware} from 'Redux/store';
import sinon from 'sinon';
import * as reactRouterRedux from 'react-router-redux';

import reducer from 'Redux/reducers/index';

describe('redux store', () => {
  it('should be a function', () => {
    expect(typeof configureStore).to.equal('function');
  })

  it('should configure a store', () => {
    sinon.spy(redux, 'createStore');

    const store = configureStore({});
    expect(redux.createStore.calledOnceWithExactly(reducer, middleware)).to.be.true;
  });

  const store = configureStore();
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

  it('should call replaceReducer if module.hot', () => {
  });

  afterEach(() => {
    if (reactRouterRedux.routerMiddleware.restore)
      reactRouterRedux.routerMiddleware.restore();

    if (redux.createStore.restore)
      redux.createStore.restore();
  });
});