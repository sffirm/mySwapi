import React, { Component, Fragment } from 'react';

import './app.scss';

import Header from '../header';
import ItemList from '../item-list';
import PersonDesc from '../person-desc';


export default class App extends Component{

  constructor() {
    super();
    this.state = {
      selectedPerson: null
    }
    this.onPersonSelected = (id) => {
      this.setState({
        selectedPerson: id
      })
    }
  }



  render() {
    return (
      <Fragment>
        <Header />
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
      </Fragment>
    )
  }

}
