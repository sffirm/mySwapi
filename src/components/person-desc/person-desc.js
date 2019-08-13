import React, { Component } from 'react';

import './person-desc.scss';

import SwapiDB from '../../swapi-db'
import PersonDescItem from './person-desc-item';

export default class PersonDesc extends Component {
  constructor() {
    super();
    this.state = {
      personData: [
        {value: null, title: 'Name'},
        {value: null, title: 'Birth Year'},
        {value: null, title: 'Gender'},
        {value: null, title: 'Height'},
        {value: null, title: 'Weight'},
        {value: null, title: 'Eye Color'},
        {value: null, title: 'Hair Color'},
        {value: null, title: 'Skin Color'},
        {value: null, title: 'Home World'},
        {value: null, title: 'Films'},
        {value: null, title: 'Vehicles'},
        {value: null, title: 'Starships'},
        {value: null, title: 'Species'},
      ]
    }
    this.SwapiDB = new SwapiDB();
    this.updatePerson(1);
    // console.log(this.updateHomeWorld('https://swapi.co/api/planets/1/').then( (data) => data));
    // console.log();
    // this.SwapiDB.getPlanet(1).then((data) => {
    //   return data.name
    // });
  }

  updatePerson(id) {
    
    this.SwapiDB.getPerson(id).then( (data) => {
      this.setState({
        personData: data
      })
    });

  }

  updateHomeWorld(link) {
    const id = this.SwapiDB.getIdLink(link);
    return this.SwapiDB.getPlanet(id).then((data) => {
      return data.name
    });
  }

  renderItems() {
    return this.state.personData.map((item) => {
      return (
        <li key={ item.title } className="list-group-item d-flex">
          <PersonDescItem data={ item } />
        </li>
      )
    })
  }


  render() {

    const itemList = this.renderItems();

    return (
      <div className="person-desc">
        <ul className="list-group list-group-flush">
        { itemList }
        </ul>
      </div>
    )
  }
}
