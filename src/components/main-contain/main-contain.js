import React from 'react';

import './main-contain.scss'

const MainContain = ({ leftSide, rightSide, title }) => {
  return (
    <main className='main'>
      <div className='container-fluid'>
        <div className="row">
          <div className="col-12">
            <div className="title-text">{ title }</div>
          </div>
          <div className="col-sm-5 col-md-4">
            { leftSide }
          </div>
          <div className="col-sm-7 col-md-8">
            { rightSide }
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainContain;