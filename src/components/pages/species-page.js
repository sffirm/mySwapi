import React, { Component } from 'react';

import PageComponent from './page-component';
import ItemDetails from '../item-details';
import ItemList from '../item-list';
import SwapiDB from '../../swapi-db';

export default class SpeciesPage extends Component {
  constructor() {
    super();
    this.state = {
      selectedElem: null,
      error: false
    }
    this.onElemSelected = (id) => {
      this.setState({
        selectedElem: id
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
    
    const itemList = (<ItemList 
      onItemSelected={ this.onElemSelected }
      getData={ this.SwapiDB.getAllSpecies }
      renderItem={(item) => {
        return(
          <span className="d-flex justify-content-between">
            <span className="item-title">{ item.name }</span>
            <span className="item-desc">({ item.skinColor })</span>
          </span>
        )
    }}/>)

    const itemDetails = (<ItemDetails 
      id={ this.state.selectedElem } 
      getData={ this.SwapiDB.getSpecies }
      />);

    return(
      <PageComponent 
        itemDetails={ itemDetails }
        itemList={ itemList }
        error={ this.state.error }
      />
    )
  }

}