import React, { Component, Fragment } from 'react';

import './app.scss';

import Header from '../header';
import PeoplePage from '../people-page';


export default class App extends Component{

  constructor() {
    super();
  }



  render() {
    return (
      <Fragment>
        <Header />
        <PeoplePage />
      </Fragment>
    )
  }

}
