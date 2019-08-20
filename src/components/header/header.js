import React, {Component} from 'react';
import { Link } from 'react-router-dom';

import SwapiDB from '../../swapi-db';

import './header.scss'

export default class Header extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    }
    this.SwapiDB = new SwapiDB();
  }

  componentDidMount() {
    this.SwapiDB.getResource('/').then((data) => {
      const array = [];
      for (let item in data) {
        array.push(item)
      }
      this.setState({
        data: array
      })
    })
  }

  renderItems(item) {
    if (item.length === 0) {
      return null;
    }
    return item.map((elem, index) => {
      let clazz = 'nav-item';
      return (
        <li key={ index } className={ clazz }>
          <Link to={ '/' + elem + '/' } className="nav-link">{ elem }</Link>
        </li>
      )
    })
  }

  render() {

    const { data } = this.state;

    const items = this.renderItems(data);

    return (
      <header className="header">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-sm-5 col-md-4">
              <Link to="/" className="logo">myStarwars</Link>
            </div>
            <div className="col-sm-7 col-md-8">
              <nav className="navbar navbar-expand-sm navbar-light">
                <ul className="navbar-nav d-flex justify-content-between">
                  { items }
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
    )
  }
}