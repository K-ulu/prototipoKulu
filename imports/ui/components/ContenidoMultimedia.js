import React from 'react'

export default class ContenidoMultimedia extends React.Component {
    render() {
        return (
            <div>
            {/*Inicio componente */}

                {/*Inicio row */}
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">

                        <div className="card noborder mb-3">
                            <div className="card-body">
                                {/*title*/}
                                <div className="row justify-content-center">
                                    <div className="col-6">
                                        <h1>Mi contenido multimedia</h1>
                                    </div>     
                                </div>

                            <div className="row justify-content-center">
                                <div className="col-10">


                                {/*buttons and filter options*/}
                                <div className="row justify-content-between">

                                <div className="col-2">
                                    <button className="btn btn-primary btn-block">Nuevo</button>
                                </div>

                                <div className="col-2 btn-group" role="group" aria-label="Basic example">
                                    <button  type="button" className="btn btn-secondary"><i className="fa fa-th-large"></i></button>
                                    <button  type="button" className="btn btn-secondary"><i className="fa fa-align-justify"></i></button>                          
                                </div> 

                                </div>


                                {/*Buscador..*/}
                                <div className="row justify-content-between">
                                <div className="col-12">
                                    <form className="form-inline">
                                    <input className="form-control mr-4 col-lg-8" type="text" placeholder="Buscar..."/>
                                    <button className="btn btn-outline-success ml-4 col-lg-3" type="submit">Buscar</button>
                                    </form>                  
                                </div>
                                </div>



                                {/*Cards 100%..*/}
                                <div className="row section-cards list">
                                <div className="col-12">                            

                                    <div className="card">
                                        <div className="card-body">
                                        <div className="row justify-content-between">
                                            <div className="col-8">
                                            <h5 className="card-title">Card title</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Audio</h6>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>                            
                                            </div>                          
                                            <div className="col-2">
                                            <div className="btn-group" role="group" aria-label="Basic example">                            
                                                <button type="button" className="btn btn-secondary success-btn"><i className="fa fa-pencil"></i></button>                          
                                                <button type="button" className="btn btn-secondary danger-btn"><i className="fa fa-trash"></i></button>
                                            </div>  
                                            </div> 
                                        </div>
                                        </div>
                                    </div>

                                    <div className="card">
                                        <div className="card-body">
                                        <div className="row justify-content-between">
                                            <div className="col-8">
                                            <h5 className="card-title">Card title</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Vídeo</h6>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>                            
                                            </div>                          
                                            <div className="col-2">
                                            <div className="btn-group" role="group" aria-label="Basic example">                            
                                                <button type="button" className="btn btn-secondary success-btn"><i className="fa fa-pencil"></i></button>                          
                                                <button type="button" className="btn btn-secondary danger-btn"><i className="fa fa-trash"></i></button>
                                            </div>  
                                            </div> 
                                        </div>
                                        </div>
                                    </div>
                                    
                                    {/*</div> */}
                                
                                </div>                        
                                </div>

                                {/*Cards 50%..*/}
                                <div className="row">
                                <div className="col-6">
                                    <div className="card">
                                    <div className="card-body">
                                        <div className="row justify-content-between">
                                        <div className="col-8">
                                            <h5 className="card-title">Card title</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>                            
                                        </div>                          
                                        <div className="col-3">
                                            <div className="btn-group" role="group" aria-label="Basic example">                            
                                            <button type="button" className="btn btn-secondary success-btn"><i className="fa fa-pencil"></i></button>                          
                                            <button type="button" className="btn btn-secondary danger-btn"><i className="fa fa-trash"></i></button>
                                            </div>  
                                        </div> 
                                        </div>
                                    </div>
                                    </div>
                                </div>   

                                <div className="col-6">
                                    <div className="card">
                                    <div className="card-body">
                                        <div className="row justify-content-between">
                                        <div className="col-8">
                                            <h5 className="card-title">Card title</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">Card subtitle</h6>
                                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>                            
                                        </div>                          
                                        <div className="col-3">
                                            <div className="btn-group" role="group" aria-label="Basic example">                            
                                            <button type="button" className="btn btn-secondary success-btn"><i className="fa fa-pencil"></i></button>                          
                                            <button type="button" className="btn btn-secondary danger-btn"><i className="fa fa-trash"></i></button>
                                            </div>  
                                        </div> 
                                        </div>
                                    </div>
                                    </div>
                                </div>  
                                </div>
                                
                                </div>
                            </div>

                                                
                            </div>
                            {/*<div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>*/}
                        </div>
                    </div>


                </div>
                {/*Fin row */}


            
            {/*Fin componente */}
            </div>
        );
    }
}