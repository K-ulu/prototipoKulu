import React from 'react';
import PropTypes from "prop-types";

export default class HomeBand extends React.Component {
    render () {
        return (
            <div className="container-fluid bg-home-band d-none d-lg-block">
                <div className="row justify-content-center">
                    <div className="col-4">
                        <div className="row justify-content-center">
                            <div className="col-4 text-center">
                                <img className="img-home-band" src="images/net.png" />
                            </div>
                            <div id="text-home-band" className="col-7 align-self-center">
                                <h5>Un mundo por descubrir <small>Explora una amplia variedad de contenido</small></h5>                                
                            </div>
                        </div>                   
                    </div>    
                    <div className="col-4">
                        <div className="row justify-content-center">
                            <div className="col-4 text-center">
                                <img className="img-home-band" src="images/verified.png" />
                            </div>
                            <div id="text-home-band" className="col-7 align-self-center">
                                <h5>Maestros verificados <small>Siempre encontrarás maestros preparados</small></h5>                                
                            </div>
                        </div>                   
                    </div>        
                    <div className="col-4">
                        <div className="row justify-content-center">
                            <div className="col-4 text-center">
                                <img className="img-home-band" src="images/clock.png" />
                            </div>
                            <div id="text-home-band" className="col-7 align-self-center">
                                <h5>Acceso 24/7 <small>En cualquier momento</small></h5>                                
                            </div>
                        </div>                   
                    </div>    
                </div>
            </div>
        );
    }
}