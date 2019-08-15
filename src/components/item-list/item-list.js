import React, { Component } from 'react';

import SwapiDB from '../../swapi-db';

import './item-list.scss';

export default class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      peopleList: null
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
            peopleList
          })
        });
  }

  renderItems(data) {
    console.log(data)
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
    const { peopleList } = this.state;
    console.log(this.state);

    if ( !peopleList ) {
      return (
        <div>test</div>
      )
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