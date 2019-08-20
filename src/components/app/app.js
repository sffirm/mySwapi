import React, { Component, Fragment } from 'react';

import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Header from '../header';

import './app.scss';

import { 
  PeoplePage, 
  PlanetPage, 
  StarshipPage, 
  VehiclePage, 
  SpeciesPage, 
  FilmPage,
  StartPage } from '../pages';


export default class App extends Component{

  constructor() {
    super();
  }



  render() {
    return (
      <Fragment>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={ StartPage }/>
            <Route exact path="/people/:id?" component={ PeoplePage }/>
            <Route exact path="/planets/:id?" component={ PlanetPage } />
            <Route exact path="/starships/:id?" component={ StarshipPage } />
            <Route exact path="/vehicles/:id?" component={ VehiclePage } />
            <Route exact path="/species/:id?" component={ SpeciesPage } />
            <Route exact path="/films/:id?" component={ FilmPage } />
            <Redirect to="/" />
          </Switch>
        </BrowserRouter>
      </Fragment>
    )
  }

}
