import React, { Component } from 'react';

import './item-list.scss';

export default class ItemList extends Component {
  constructor() {
    super();


  }

  render() {

    return (
      <div className="item-list">
        <div className="list-group">
          <a href="#" className="list-group-item list-group-item-action active">
            Cras justo odio
          </a>
          <a href="#" className="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
          <a href="#" className="list-group-item list-group-item-action">Morbi leo risus</a>
          <a href="#" className="list-group-item list-group-item-action">Porta ac consectetur ac</a>
          <a href="#" className="list-group-item list-group-item-action">Vestibulum at eros</a>
        </div>
      </div>
    )

  }
}