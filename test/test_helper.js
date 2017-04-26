import jsdom from 'jsdom';
import jquery from 'jquery';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import chai, {expect} from 'chai'; //vuce celu biblioteku
import React from 'react';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import reducers from '../src/reducers';
import chaiJquery from 'chai-jquery'

// set up testing environment to run like a browser in the command line

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>'); //fake browser
global.window = global.document.defaultView;
const $ = jquery(global.window); //don't go to dom, goes to global.window


// build 'renderComponent' helper that should render a given react class

function renderComponent(ComponentClass, props, state){
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={ createStore(reducers, state) }>
    <ComponentClass {...props} />
    </Provider>
  );

return $(ReactDOM.findDOMNode(componentInstance)); //prudces html

}

// build helper for simulating events


$.fn.simulate = function(eventName, value) {
  if(value) {
    this.val(value);
  }

  TestUtils.Simulate[eventName](this[0]);

}

//to call simulate $('div').simulate


// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect};
