import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";
import { Accounts } from 'meteor/accounts-base';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

class Signup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      error: ''
    };
  }

  componentWillMount(){
    const isLoggedIn = this.props.isAuthenticated;
    if (isLoggedIn) {
      this.props.history.push('/teachers');
    }
  }

  onSubmit(e){
    e.preventDefault();


    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();
    let opcion = this.selectVal.value;
    console.log(opcion);
    Accounts.createUser({email, password, opcion}, (err) => {
      console.log('signup callback', err);
    });
    function (err, res) {
      if(err) {
          console.log("ERR: "+err)
      }
    }
    /*const Posts = new Mongo.Collection("posts");

    Posts.insert({
            email: email,
            password: password,
            opcion: opcion
    }/*, function (err, res) {
            if(err) {
                console.log("ERR: "+err)
            }
          }*/
        //);
    //assert (Posts.find (). count () === 1 );
    //const Posts = new Mongo.Collection('posts');
    //Posts.insert({ title: 'Hello world', body: 'First post' });
    
    // Changes are visible immediately—no waiting for a round trip to the server.
  }

  

  render () {
    return (
      <div>
        <Navbar/>
        <div className="container py-5">
          <div className="row">
              <div className="col-md-12">
                  <h2 className="text-center mb-4"></h2>
                  <div className="row">
                      <div className="col-md-5 mx-auto">
                          <span className="anchor" id="formLogin"></span>

                          {/*<!-- form card login -->*/}
                          <div className="alert alert-danger" role="alert">
                            {this.state.error ? <p>{this.state.error}</p> : undefined}
                          </div>
                          <div className="card rounded">
                              <div className="card-header">
                                  <h3 className="mb-0 text-center">Regístrate</h3>
                              </div>
                              <div className="card-body mt-4">
                                  <form onSubmit={this.onSubmit.bind(this)} className="form" role="form" autoComplete="off" id="formLogin">
                                      <div className="input-group margin-bottom-sm col-sm-12 col-md-12 col-lg-12">
                                          <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                                          <input type="email" ref="email" name="email" className="form-control form-control rounded" placeholder="Correo electrónico"/>
                                      </div>
                                      <div className="input-group margin-bottom-sm col-sm-12 col-md-12 col-lg-12">
                                          <span className="input-group-addon"><i className="fa fa-lock fa-fw"></i></span>
                                          <input type="password" ref="password" name="password" className="form-control form-control rounded" placeholder="Constraseña"/>
                                      </div>

                                      <div className = "input-group margin-bottom-sm col-sm-12 col-md-12 col-lg-12">
                                      <span className="input-group-addon"><i className="fa fa-user fa-fw"></i></span>
                                      <select className="form-control form-control rounded" ref={(input) => this.selectVal = input} name ="opcion">
                                        <option>Alumno</option>
                                        <option>Docente</option>
                                        <option>Usuario</option>
                                        <option selected>Seleccione</option>
                                      </select>
                                      </div>

                                      <div className="text-center">
                                        <a href="recuperar.html">¿Olvidaste tu contraseña?</a> ó <a href="/login">¿Ya tienes una cuenta?</a>

                                      </div>
                                      <div className="row-login">
                                        <button type="submit" className="btn btn-primary btn-lg text-center">Regístrarse</button>
                                      </div>

                                  </form>
                              </div>
                              {/*<!--/card-block-->*/}
                          </div>
                          {/*<!-- /form card login -->*/}
                      </div>
                  </div>
                  {/*<!--/row-->*/}
              </div>
              {/*<!--/col-->*/}
          </div>
          {/*<!--/row-->*/}
        </div>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(Signup);
