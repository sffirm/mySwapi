import React, { Component } from 'react';

import './item-list.scss';
import Preloader from '../preloader';

export default class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      itemList: null,
      loading: false
    }
  }

  componentDidMount() {
    const { getData } = this.props;
    getData().then((itemList) => {
      this.setState({
        itemList,
        loading: true
      })
    });
  }

  renderItems(data) {
    return data.map((item) => {
      const { id } = item;
      const label = this.props.renderItem(item);
      return (
        <a href="#" 
        className="list-group-item list-group-item-action"
        key={ id }
        onClick={(e) => {
          e.preventDefault();
          this.props.onItemSelected(id)
          }}>
        { label }</a>
      )
    });
  }

  render() {
    const { itemList, loading } = this.state;

    if ( !loading ) {
      return <Preloader />
    }

    this.renderItems(itemList);
    const items = this.renderItems(itemList);


    return (
      <div className="item-list item-menu">
        <div className="list-group">
          { items }
        </div>
      </div>
    )

  }
}