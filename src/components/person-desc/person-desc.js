import React, { Component } from 'react';

import './person-desc.scss';

import SwapiDB from '../../swapi-db'
import PersonDescItem from './person-desc-item';
import Preloader from '../preloader'

export default class PersonDesc extends Component {
  constructor() {
    super();
    this.state = {
      personData: {
        name: null,
        personId: null,
        details: [
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
      },
      selected: false,
      loading: false
    };
    this.personsDB = {};
    this.SwapiDB = new SwapiDB();
  }

  componentDidMount() {
    this.updatePerson();
  }

  componentDidUpdate(prevProps) {
    if (this.props.personId !== prevProps.personId) {
      this.setState({
        loading: false,
        selected: true,
      })
      this.updatePerson();
    }
  }

  updatePerson() {
    const { personId } = this.props;
    if (!personId) {
      return false;
    }

    if (this.personsDB[personId]) {
      this.setState({
        personData: this.personsDB[personId],
        loading: true,
        selected: true
      })
    } else {
      this.SwapiDB.getPerson(personId).then( (data) => {
        this.personsDB[personId] = data;
        this.setState({
          personData: data,
          loading: true,
          selected: true
        })
      });
    }
  }

  updateHomeWorld(link) {
    const id = this.SwapiDB.getIdLink(link);
    return this.SwapiDB.getPlanet(id).then((data) => {
      return data.name;
    });
  }

  renderItems(data) {
    return data.map((item) => {
      return (
        <li key={ item.title } className="list-group-item d-flex">
          <PersonDescItem data={ item } />
        </li>
      )
    })
  }


  render() {

    const { personData: {details}, loading, selected } = this.state;

    if (!selected) {
      return (
        <div className="person-desc">
          <div className="charecter_not_choose">Select a character from the list.</div>
        </div>
      )
    }

    if (!loading) {
      return <Preloader />
    }

    const items = this.renderItems(details);

    return (
      <div className="person-desc">
        <ul className="list-group list-group-flush">
        { items }
        </ul>
      </div>
    )
  }
}
