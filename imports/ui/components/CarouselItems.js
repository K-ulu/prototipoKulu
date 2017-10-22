import React from 'react';
import PropTypes from 'prop-types';

export default class CarouselItems extends React.Component {
  render () {
    return (
      <div className="container margin-block">
        <h2>{this.props.name}</h2>
      </div>
    );
  }
}
