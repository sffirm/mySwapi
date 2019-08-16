import React, { Component, Fragment } from 'react';

import PersonDesc from '../person-desc';
import ItemList from '../item-list';
import ErrorComponent from '../error-componen';
import SwapiDB from '../../swapi-db';
import MainContain from '../main-contain'

export  default class PeoplePage extends Component {
  constructor() {
    super();
    this.state = {
      selectedPerson: null,
      error: false
    }
    this.onPersonSelected = (id) => {
      this.setState({
        selectedPerson: id
      })
    }
    this.SwapiDB = new SwapiDB();
  }


  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <ErrorComponent />
    }

    const itemList = (<ItemList 
                      onItemSelected={ this.onPersonSelected }
                      getData={ this.SwapiDB.getAllPeople }
                      renderItem={(item) => {
                        return(
                          <span className="d-flex justify-content-between">
                            <span className="item-title">{ item.name }</span>
                            <span className="item-desc">({ item.gender })</span>
                          </span>
                        )
                      }}/>)

    const personDesc = (<PersonDesc personId={ this.state.selectedPerson } />);


    return (
      <MainContain 
        leftSide={ itemList }
        rightSide={ personDesc }
      />
    )
  }
}
