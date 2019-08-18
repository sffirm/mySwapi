import React from 'react';

import ErrorComponent from '../error-componen';
import MainContain from '../main-contain'

const PageComponent = (props) => {

  const { error } = props;
  if (error) {
    return <ErrorComponent />
  }

  return (
    <MainContain 
      leftSide={ props.itemList }
      rightSide={ props.itemDetails }
    />
  )
}

export default PageComponent;
