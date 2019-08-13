import React, { Component } from 'react';

export default class PersonDesc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="person-desc">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">Cras justo odio</li>
          <li className="list-group-item">Dapibus ac facilisis in</li>
          <li className="list-group-item">Morbi leo risus</li>
          <li className="list-group-item">Porta ac consectetur ac</li>
          <li className="list-group-item">Vestibulum at eros</li>
        </ul>
      </div>
    )
  }
}
