import React, { Component, Fragment } from 'react';

import './app.scss';

import Header from '../header';
import { 
  PeoplePage, 
  PlanetPage, 
  StarshipPage, 
  VehiclePage, 
  SpeciesPage, 
  FilmPage } from '../pages';


export default class App extends Component{

  constructor() {
    super();
  }



  render() {
    return (
      <Fragment>
        <Header />
        <PeoplePage />
        <PlanetPage />
        <StarshipPage />
        <VehiclePage />
        <SpeciesPage />
        <FilmPage />
      </Fragment>
    )
  }

}
