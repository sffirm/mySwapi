import React, { Component } from 'react';

import './item-details.scss';

import SwapiDB from '../../swapi-db'
import ItemDesc from './item-desc';
import Preloader from '../preloader'

export default class ItemDetails extends Component {
  constructor() {
    super();
    this.state = {
      itemData: {},
      selected: false,
      loading: false
    };
    this.SwapiDB = new SwapiDB();
  }

  componentDidMount() {
    this.updateDetails();
  }

  componentDidUpdate(prevProps) {
    if (this.props.id !== prevProps.id) {
      this.setState({
        loading: false,
        selected: true,
      })
      this.updateDetails();
    }
  }

  updateDetails() {
    const { id } = this.props;
    if (!id) {
      this.setState({
        loading: false,
        selected: false,
        })
      return false;
    }

    this.props.getData(id).then( (data) => {
      this.setState({
        itemData: data,
        loading: true,
        selected: true
      })
    });
  }

  renderItems(data) {
    return data.map((item) => {
      return (
        <li key={ item.title } className="list-group-item d-flex">
          <ItemDesc data={ item } />
        </li>
      )
    })
  }


  render() {

    const { itemData: {details}, loading, selected } = this.state;

    if (!selected) {
      return (
        <div className="item-details">
          <div className="charecter_not_choose">Select a item from the list.</div>
        </div>
      )
    }

    if (!loading) {
      return <Preloader />
    }

    const items = this.renderItems(details);

    return (
      <div className="item-details">
        <ul className="list-group list-group-flush">
        { items }
        </ul>
      </div>
    )
  }
}
