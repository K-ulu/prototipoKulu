import React from 'react'

export default class ContenidoPrincipal extends React.Component {
    render(){
        return(
            <div>
            {/*Inicio componente */}

                {/*Inicio row */}
                <div className="row">  

                    <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card-box noradius noborder bg-default">
                            <i className="fa fa-file-text-o float-right text-white"></i>
                            <h6 className="text-white text-uppercase m-b-20">Orders</h6>
                            <h1 className="m-b-20 text-white counter">1,587</h1>
                            <span className="text-white">15 New Orders</span>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card-box noradius noborder bg-warning">
                            <i className="fa fa-bar-chart float-right text-white"></i>
                            <h6 className="text-white text-uppercase m-b-20">Visitors</h6>
                            <h1 className="m-b-20 text-white counter">250</h1>
                            <span className="text-white">rate: 25%</span>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card-box noradius noborder bg-info">
                            <i className="fa fa-user-o float-right text-white"></i>
                            <h6 className="text-white text-uppercase m-b-20">Users</h6>
                            <h1 className="m-b-20 text-white counter">120</h1>
                            <span className="text-white">25 New Users</span>
                        </div>
                    </div>

                    <div className="col-xs-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card-box noradius noborder bg-danger">
                            <i className="fa fa-bell-o float-right text-white"></i>
                            <h6 className="text-white text-uppercase m-b-20">Alerts</h6>
                            <h1 className="m-b-20 text-white counter">58</h1>
                            <span className="text-white">5 New Alerts</span>
                        </div>
                    </div>

                </div>
                {/*Fin row */}
          
                {/*Inicio row */}
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-6">
                        <div className="card mb-3">
                            <div className="card-header">
                                <h3><i className="fa fa-line-chart"></i> Items Sold Amount</h3>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non luctus metus. Vivamus fermentum ultricies orci sit amet
                                sollicitudin.
                            </div>
                            <div className="card-body">
                                <canvas id="lineChart"></canvas>
                            </div>
                            <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card mb-3">
                            <div className="card-header">
                                <h3><i className="fa fa-bar-chart-o"></i> Colour Analytics</h3>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non luctus metus. Vivamus fermentum ultricies orci sit amet
                                sollicitudin.
                            </div>
                            <div className="card-body">
                                <canvas id="pieChart"></canvas>
                            </div>
                            <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                        </div>
                    </div>

                    <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-3">
                        <div className="card mb-3">
                            <div className="card-header">
                                <h3><i className="fa fa-bar-chart-o"></i> Colour Analytics 2</h3>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus non luctus metus. Vivamus fermentum ultricies orci sit amet
                                sollicitudin.
                            </div>
                            <div className="card-body">
                                <canvas id="doughnutChart"></canvas>
                            </div>
                            <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                        </div>                    
                    </div>

                </div>                
                {/*Fin row */}   

            {/*Fin componente */}
            </div> 
        );
    }
}