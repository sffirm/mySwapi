import React, {Component} from 'react';

import './header.scss'

export default class Header extends Component {
  render() {
    return (
      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-5 col-md-4">
              <h1>myStarwars</h1>
            </div>
            <div className="col-sm-7 col-md-8">
              <nav className="navbar navbar-expand-sm navbar-light">
                <ul className="navbar-nav">
                  <li className="nav-item active">
                    <a href="#" className="nav-link">People</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">Planets</a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link">Starships</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }
}