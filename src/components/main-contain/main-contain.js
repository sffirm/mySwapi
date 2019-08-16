import React from 'react';

const MainContain = ({ leftSide, rightSide }) => {
  return (
    <main className='main'>
      <div className='container-fluid'>
        <div className="row">
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