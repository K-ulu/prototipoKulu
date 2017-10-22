import React from 'react';
import PropTypes from 'prop-types';

export default class Carousel extends React.Component {
  render () {
    return (
      <div>
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
          <ol className="carousel-indicators">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol>
          <div className="carousel-inner" role="listbox">
            <div className="carousel-item active img">
              <img className="d-block img-fluid" src="/images/soloprimera.png" alt="First slide"/>
              <div className="carousel-caption d-none d-md-block">
                <h2>Bienvenido a K'ulu'!</h2>
                <p className="lead">La forma más entretenida de aprender juntos.</p>
                <a className="btn btn-large btn-primary" href="#">Leer más</a>
              </div>
            </div>
            <div className="carousel-item img">
              <img className="d-block img-fluid" src="/images/solosegunda.png" alt="Second slide"/>
              <div className="carousel-caption d-none d-md-block">
                <h2>Únete a K'ulu'</h2>
                <p className="lead">Crea una cuenta y empieza a disfrutar de <br/> las sorpresas que tenemos para ti.</p>
                <a className="btn btn-large btn-primary" href="#">Regístrate</a>
              </div>
            </div>
            <div className="carousel-item img">
              <img className="d-block img-fluid" src="/images/solotercera.png" alt="Third slide"/>
              <div className="carousel-caption d-none d-md-block">
                <h2>Aprende y diviértete</h2>
                <p className="lead">No hay mejor manera de aprender que jugando<br/>¡Te esperamos!</p>
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
