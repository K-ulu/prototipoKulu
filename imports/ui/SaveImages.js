import React from 'react';
import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';

const Photos = new Mongo.Collection('photos');

export default class SaveImages extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          error: '', //almacena el error
          value: '' //almacena valor del tipo de usuario
        };
        this.photoInputOnChange = this.photoInputOnChange.bind(this);
    }

    getMeteorData(){
        console.log(Photos.find({}).fetch());
        return{
            photos: Photos.find({}).fetch()
        }
    }

    renderPhoto(){
        return (
            <div>mi nuevo metodo</div>
        )
    }
    
    photoInputOnChange(){
        console.log('onChange');
        console.log(this.refs.photoInput.value);
       // if (Meteor.isClient) {
        Photos.insert({photo:this.refs.photoInput.value});
        //}
        const Posts = new Mongo.Collection('posts');
        Posts.insert({ title: 'Hello world', body: 'First post' });
    }

    render(){
        return (
            <div>
              <p>Probando guardar imagenes</p>
              {this.renderPhoto()}
              {/* {this.getMeteorData()} */}
              <input ref='photoInput' onChange={this.photoInputOnChange}/>
            </div>          
        );
    }
}
