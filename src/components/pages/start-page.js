import React, { Fragment } from 'react';

import { MainContainStart } from '../main-contain';

const StartPage = () => {

  const content = <div className="welcom-text">Welcom to Swapi</div>;


  return (
    <Fragment>
      <MainContainStart content={ content }/>
    </Fragment>
    
  )
}

export default StartPage;
