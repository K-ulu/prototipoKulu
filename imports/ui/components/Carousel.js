import React from 'react';
import PropTypes from 'prop-types';

export default class Carousel extends React.Component {
  render () {
    return (
      <div>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          {/* 
          <ol className="carousel-indicators">
             ---- indicadores de carousel ------
              <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>            
          </ol>
          */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src="/images/slide1.jpg" alt="First slide"/>
              <div className="carousel-caption">
                <h2>¡Bienvenido a K'ulu'!</h2>
                <p className="lead d-none d-sm-block">La forma más entretenida de aprender juntos.</p>
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/images/slide2.jpg" alt="Second slide"/>
              <div className="carousel-caption">
                <h2>¡Únete a K'ulu'!</h2>
                <p className="lead d-none d-sm-block">Empieza a disfrutar de las sorpresas que tenemos para ti.</p>                
              </div>
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src="/images/slide3.jpg" alt="Third slide"/>
              <div className="carousel-caption">
                <h2>¡Aprende y diviértete!</h2>
                <p className="lead d-none d-sm-block">{/*No hay mejor manera de aprender que jugando*/}¡Te esperamos!</p>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    );
  }
}
