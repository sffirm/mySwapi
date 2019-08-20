import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './item-list.scss';
import Preloader from '../preloader';

export default class ItemList extends Component {
  constructor() {
    super();
    this.state = {
      itemList: null,
      loading: false,
    }
  }

  componentDidMount() {
    this.updateItems();
  }

  updateItems(url) {
    const { getData } = this.props;
    getData(url).then((itemList) => {
      this.setState({
        itemList: itemList.data,
        loading: true,
        paging: {
          next: itemList.next,
          prev: itemList.prev,
        }
      })
    });
  }

  renderItems(data) {
    return data.map((item) => {
      const { id, type } = item;
      const label = this.props.renderItem(item);
      return (
        <Link to={ `/${type}/${id}` }
        className="list-group-item list-group-item-action"
        key={ id }
        onClick={() => {
          this.props.onItemSelected(id)
          }}>
        { label }</Link>
      )
    });
  }

  renderPaging() {
    const { prev, next } = this.state.paging;
    
    
    const prevBtn = prev ? <button onClick={ () => { this.updateItems(prev)} } type="button" className="btn btn-light">Prev</button> : null;
    const nextBtn = next ? <button onClick={ () => { this.updateItems(next)} } type="button" className="btn btn-light">Next</button> : null;
    
    return(
      <div className="item-paging d-flex justify-content-between">
        <div className="item-btn-contain">
          { prevBtn }
        </div>
        <div className="item-btn-contain">
          { nextBtn }
        </div>
      </div>
    )
  }

  render() {
    const { itemList, loading, paging } = this.state;
    let itemPaging = null;

    if ( !loading ) {
      return <Preloader />
    }

    this.renderItems(itemList);
    const items = this.renderItems(itemList);

    if ( paging ) {
      itemPaging = this.renderPaging();
    }


    return (
      <div className="item-list item-menu">
        <div className="list-group">
          { items }
        </div>
        { itemPaging }
      </div>
    )

  }
}