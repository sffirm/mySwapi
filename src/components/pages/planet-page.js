import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import PageComponent from './page-component';
import ItemDetails from '../item-details';
import ItemList from '../item-list';
import SwapiDB from '../../swapi-db';

class PlanetPage extends Component {
  constructor() {
    super();
    this.state = {
      error: false
    }
    this.SwapiDB = new SwapiDB();
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  render() {
    const { id } = this.props.match.params;
    const { history } = this.props;
    const itemList = (<ItemList 
      onItemSelected={ (id) => {return history.push(id)} }
      getData={ this.SwapiDB.getAllPlanets }
      renderItem={(item) => {
        return(
          <span className="d-flex justify-content-between">
            <span className="item-title">{ item.name }</span>
            <span className="item-desc">({ item.climate })</span>
          </span>
        )
    }}/>)

    const itemDetails = (<ItemDetails 
      id={ id } 
      getData={ this.SwapiDB.getPlanet }
      />);

    return(
      <PageComponent 
        title="Planets"
        itemDetails={ itemDetails }
        itemList={ itemList }
        error={ this.state.error }
      />
    )
  }
}

export default withRouter(PlanetPage);