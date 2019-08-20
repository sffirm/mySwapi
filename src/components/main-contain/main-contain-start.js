import React from 'react';

const MainContainStart = ({ content }) => {
  return (
    <main className='main'>
      <div className='container-fluid'>
        <div className="row">
          <div className="col">
            { content }
          </div>
        </div>
      </div>
    </main>
  )
}

export default MainContainStart;