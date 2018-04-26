import React from 'react';
import PropTypes from 'prop-types';

export default class Error extends React.Component {

    render(){
        let errorMessage = this.props.errorMessage;
        

        return (
            <div className="alert alert-danger" role="alert">
                <p>{ errorMessage }</p>
            </div>


        );
    }
        

    
}
