import React, { Component, Fragment } from 'react';

export default class PersonDescItem extends Component {

  constructor() {
    super();
  }

  createItemList(content) {
    console.log(content)

    if (content === null) {
      return false;
    }

    if (typeof content === 'string') {
      return content;
    }

    if (typeof content === 'object') {
      return content.map((item, i) => {
        const name = item.title ? item.title : item.name;
        if ((content.length - 1) === i) {
          return (
            <Fragment>
              <a data-id={item.id} data-category={item.category} href="#">{ name }</a>
            </Fragment>
          )
        }
        return (
          <Fragment>
            <a data-id={item.id} data-category={item.category} href="#">{ name }</a>{', '}
          </Fragment>
        )
      })
    }
  }

  render() {
    const { data } = this.props;
    const content = this.createItemList(data.value);
    return (
      <Fragment>
        <span className="list-title">{ data.title }:</span>
        <span>{ content }</span>
      </Fragment>
    )
  }

}
