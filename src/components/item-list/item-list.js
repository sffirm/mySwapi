import React, { Component } from 'react';

import SwapiDB from '../../swapi-db';

import './item-list.scss';
import Preloader from '../preloader';

export default class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      peopleList: null,
      loading: false
    }
  }

  componentDidMount() {
    this.SwapiDB = new SwapiDB();
    this.updateItems();
  }

  async updateItems() {
    this.SwapiDB.getAllPeople()
        .then((peopleList) => {
          this.setState({
            peopleList,
            loading: true
          })
        });
  }

  renderItems(data) {
    return data.map((item) => {
      return (
        <a href="#" 
        className="list-group-item list-group-item-action"
        key={ item.id }>
        { item.name }</a>
      )
    });
  }

  render() {
    const { peopleList, loading } = this.state;

    if ( !loading ) {
      return <Preloader />
    }

    this.renderItems(peopleList);
    const items = this.renderItems(peopleList);


    return (
      <div className="item-list">
        <div className="list-group">
          { items }
        </div>
      </div>
    )

  }
}