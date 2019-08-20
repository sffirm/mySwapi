import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const createItemList = (content) => {
  if (content === null) {
    return false;
  }

  if (typeof content === 'string') {
    return content;
  }

  if (typeof content === 'object') {
    return content.map((item, i) => {
      const name = item.title ? item.title : item.name;
      return (
        <span className="item-desc" key={ i }>
          <Link to={ `/${item.category}/${item.id}` }>{ name }</Link>
        </span>
      )
    })
  }
}

const ItemDesc = (props) => {
  const { data } = props;
  const content = createItemList(data.value);
  return (
    <Fragment>
      <span className="list-title">{ data.title }:</span>
      <span>{ content }</span>
    </Fragment>
  )
}


export default ItemDesc;