import React, { Fragment } from 'react';

import './app.scss';

import Header from '../header';
import ItemList from '../item-list';
import PersonDesc from '../person-desc';


const App = () => {
  return (
    <Fragment>
      <Header />
      <main className='main'>
        <div className='container-fluid'>
          <div className="row">
            <div className="col-sm-5 col-md-4">
              <ItemList />
            </div>
            <div className="col-sm-7 col-md-8">
              <PersonDesc />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  )
}

export default App;
