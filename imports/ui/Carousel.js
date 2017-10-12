import React from 'react';
import PropTypes from 'prop-types';

export default class Carousel extends React.Component {
  render (){
    return (
      <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel">
        <div className="carousel-inner" role="listbox">
          <div className="carousel-item active">
            <img className="d-block img-fluid" src="images/1.jpg" alt="First slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block img-fluid" src="images/1.jpg" alt="Second slide"/>
          </div>
          <div className="carousel-item">
            <img className="d-block img-fluid" src="1.jpg" alt="Third slide"/>
          </div>
        </div>
      </div>
    );
  }
}
