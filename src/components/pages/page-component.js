import React, { Fragment } from 'react';

import ErrorComponent from '../error-componen';
import { MainContain } from '../main-contain';

const PageComponent = (props) => {

  const { error } = props;
  if (error) {
    return <ErrorComponent />
  }

  return (
    <Fragment>
      <MainContain 
        title={ props.title }
        leftSide={ props.itemList }
        rightSide={ props.itemDetails }
      />
    </Fragment>
  )
}

export default PageComponent;
