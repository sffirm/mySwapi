import React, { Component } from 'react';

import PersonDesc from '../person-desc';
import ItemList from '../item-list';
import ErrorComponent from '../error-componen';

export  default class PeoplePage extends Component {
  constructor() {
    super();
    this.state = {
      selectedPerson: null,
      error: false
    }
    this.onPersonSelected = (id) => {
      this.setState({
        selectedPerson: id
      })
    }
  }

  componentDidCatch() {
    this.setState({
      error: true
    })
  }

  render() {

    const { error } = this.state;
    if (error) {
      return <ErrorComponent />
    }

    return (
        <main className='main'>
          <div className='container-fluid'>
            <div className="row">
              <div className="col-sm-5 col-md-4">
                <ItemList onItemSelected={ this.onPersonSelected } />
              </div>
              <div className="col-sm-7 col-md-8">
                <PersonDesc personId={ this.state.selectedPerson } />
              </div>
            </div>
          </div>
        </main>
    )
  }
}
