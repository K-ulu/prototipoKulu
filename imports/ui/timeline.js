import R from 'ramda';
import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Simplert from 'react-simplert'

require('../client/styles/lineaTiempo.scss');
import Whirligig from 'react-whirligig'; //Para que se desplace la linea del tiempo
import ElementosObjetosAprendizaje from '../api/elementosObjetosAprendizaje.js';
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';

import 'react-modal-video/scss/modal-video.scss';
import ModalVideo from 'react-modal-video';

propTypes = {
    dateI: PropTypes.object.isRequired,
    dateF: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    buttonText: PropTypes.string,
    id: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    usado: PropTypes.string.isRequired
};

const DefaultStartLabel = (event) => {
    //console.log(event.event[0]);
    return <div className="rt-label">
        {/* {'3.5 M.a.C.'} */}
       {event.event[0].dateI}
    </div>;
};

const DefaultEndLabel = (event) => {
    return <div className="rt-label">
        {/* {'1 D.C.'} */}
        {event.event[0].dateF}
    </div>;
};

const DefaultHeader = (props) => {
    const {fecha, title} = props.event;
    return <div>
        <h2 className='rt-title'>{title}</h2>
        <p className='rt-date'>{fecha}</p>
    </div>;
};

const DefaultImageBody = (props) =>{
    const {imageUrl} = props.imagen; 
    const {id} = props.imagen; 

    return <div>         
        <img id={id} src={imageUrl} className='rt-image2'/>
    </div>;
};

const DefaultTextBody = (props) => {
    const {descripcion} = props.event;
    return <p>{descripcion}</p>
};

const ArrowAndDot = (props) => {
    return <div className='rt-svg-container'>
        <svg viewBox="0 0 8 11" className='rt-arrow'>
            <g>
                <path d="M 0 0 L 6 4 L 0 8 L 0 0"/>
            </g>
        </svg>
        <svg viewBox="0 0 8 10" className='rt-dot'>
            <circle cx="4" cy="5" r="3" stroke="none" strokeWidth="0"/>
        </svg>
    </div>;
};

const DotAndArrow = (props) => {
    return <div className='rt-svg-container'>
        <svg viewBox="0 0 8 10" className='rt-dot2'>
            <circle cx="4" cy="5" r="3" stroke="none" strokeWidth="0"/>
        </svg>
        <svg viewBox="0 0 8 11" className='rt-arrow2'>
            <g>
                <path d="M 0 0 L 6 4 L 0 8 L 0 0"/>
            </g>
        </svg>
    </div>;
};

export default class Timelime extends Component {
    static displayName = 'Timeline';
    static topLabel;
    static bottomLabel;

    static idOriginal="";
    static urlOriginal="";

    static propTypes = {
        reverseOrder: PropTypes.bool
    };

    getStateForProps(props) {
        const {events,imagenes, reverseOrder} = props;
        const sortedEvents = R.sortBy(R.prop('date'), events || []);
        return {
            events: reverseOrder ? R.reverse(sortedEvents) : sortedEvents,
            imagenes: imagenes, //Lo agrego

            showAlert: false,
            typeAlert: 'success',
            titleAlert: 'Felicidades',
            messageAlert: 'Victoria!!!!!',

            isOpen: false,

            salir: false,
        };
    }

    constructor(props) {
        super(props);
        this.state = this.getStateForProps(props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.events != null && newProps.imagenes != null){
            console.log(newProps.imagenes.length);
            // if (newProps.imagenes.length == 0 && newProps.events.length >0){
            //     console.log("Es uno mismo");
            //     //location.href = '/dashboard';
            // }
            this.setState ({
                events: newProps.events,
                imagenes: newProps.imagenes
            });
        }
    }

      // Events
    openAlert = (title, message, type) =>{
        this.setState({
        showAlert: true,
        titleAlert: title,
        messageAlert: message,
        typeAlert: type
        });
    }

    onDragStart = (ev, props) =>{
        this.idOriginal = props.imagen.id; 
        this.urlOriginal = props.imagen.imageUrl; 
    }
    
    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (e,props, cat)=>{
        var {id} = props.event;
        id ="idO"+id;
        // console.log("idO"+ this.idOriginal);
       if (id == "idO"+ this.idOriginal){
            Meteor.call('elemento.usado', this.idOriginal,  (err, res) => {
                if (!err) {
                  console.log(cat);
                } else {
                  console.log(err.reason);
                }
            });

            document.getElementById(id).src = this.urlOriginal;
            let newImages = this.state.imagenes;
            
            const result = newImages.filter(word => word.id != this.idOriginal);
            
            if (result.length == 0){
                this.openAlert(
                    'VICTORIA!!!',
                    'Felicidades su equipo a ganado!',
                    'success'
                )
            }
            else{
                return(
                    toast.info('🦄Correctoo!', {
                        position: toast.POSITION.TOP_CENTER,
                        autoClose: 3000
                    })
                );                
            }
       }
       else{
        return(
            toast.info('🦄Incorrectoo! :C', {
                position: toast.POSITION.TOP_CENTER,
                autoClose: 3000
            })
        );
       }
    }

    DefaultFooter = (props) => {
        const {buttonText} = props.event;
        const handleClick = (e) => {
            e.preventDefault();
            this.setState({isOpen: true});
        };
        return <a className='rt-btn' href='#' onClick={handleClick}>{buttonText || 'Default Text'}</a>
    };

    contentForEvent(event, index, HeaderClass, TextBodyClass) {
        var {usado} = event;
        var {id} = event;
        let link = ElementosObjetosAprendizaje.findOne({_id: id}).link();  //The "view/download" link

        id = "idO"+id;
        const content = <div className='rt-content'>
            <div className="rt-header-container">
                <HeaderClass event={event}/>
            </div>
            <div className='rt-image-container' 
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e, event,"complete")}
            >
            {usado == "true" ? <img id={id} src= {link} className='rt-image'/> : <img id={id} src="" className='rt-image'/> }
                <TextBodyClass event={event}/>
            </div>
            <div className='rt-footer-container'>
                {this.DefaultFooter(event={event})}
            </div>
        </div>;
        if (index % 2 === 1){
            return(
                <li className='rt-event rt-offset-second' key={index}>
                    <div className='rt-backing'>
                        <DotAndArrow/>
                        {content}
                    </div>
                </li>
            );
        }
        else{
            return(
                <li className= 'rt-event' key={index}>
                    <div className='rt-backing'>
                        {content}
                        <ArrowAndDot/>
                    </div>
                </li>
            );
        }
    }

    content() {
        const {
            reverseOrder
        } = this.props;
        const {events} = this.state;

        console.log(events);
        // Build start & end labels
        // const startEvent = events.dateI;
        // const endEvent = events.dateF;

        // const startLabel = <DefaultStartLabel {events}/>;
        // const endLabel = <DefaultEndLabel {events}/>;

        // this.topLabel = reverseOrder ? endLabel : startLabel;
        // this.bottomLabel = !reverseOrder ? endLabel : startLabel;
        
        this.topLabel = <DefaultStartLabel event= {events}/>;
        this.bottomLabel = <DefaultEndLabel event= {events}/>;


        const clear = <li key='clear' className='rt-clear'>{}</li>;

        // Compose labels and events together
        return R.pipe(
            R.addIndex(R.reduce)((accum, event, index) => {
                const content = this.contentForEvent(event, index, DefaultHeader,  DefaultTextBody);
                return R.append(content, accum);
            },  [clear])
        )(events);
    }

    contentForEventImages(imagen, index, ImageBodyClass) { 
        var divID = "div"+imagen.id;
        const content = <div className='rt-content'
            onDragStart={(e)=> this.onDragStart(e, {imagen})}                    
            draggable
        >
                <ImageBodyClass imagen={imagen}/>
        </div>;
        return (
            <li className= 'rt-event-image' key={index} id={divID}>
                {content}
            </li>
        );
        
    }

    contentImages() {
        const {
            reverseOrder
        } = this.props;

        const {imagenes} = this.state; 
        const clear = <li key='clear' className='rt-clear'>{}</li>;

        // Compose labels and events together
        return R.pipe(
            R.addIndex(R.reduce)((accum, imagen, index) => {
                const content = this.contentForEventImages(imagen, index, DefaultImageBody);
                return R.append(content, accum);
            }, [clear])
        )(imagenes); 
    }

    // salir(){
    //     Meteor.call('sesionesAprendizaje.timeLine', sesion._id, "false", (err, res) => {
    //         if(!err){
    //           console.log('Sesion desactivada');
    //         } else {
    //           console.log(err.reason);
    //         }
    //     });
    //     this.setState ({
    //         salir:true
    //     });

    //     location.href = '/dashboard/nueva-sesion#';
    // }

    render() {
        const {events, imagenes, showAlert, typeAlert, titleAlert, messageAlert } = this.state;
        let contentInfo = [];
        let contentImages = [];

        let whirligig;
        const next = () => whirligig.next();
        const prev = () => whirligig.prev();

        if ((events && events.length) && (imagenes && imagenes.length)){
            contentInfo = this.content();
            contentInfo.shift();
            contentImages = this.contentImages();
        }
        else if ((events && events.length) && !(imagenes && imagenes.length)){
            contentInfo = this.content();
            contentInfo.shift();
            contentImages = <div>No hay imagenes en esta categoria!</div>;
        }
        else{
            contentInfo = <div></div>;
            contentImages = <div></div>;
        }

        return (
        <div> 
            <div className = "rt-container-image" >
                <h3>Imagenes:</h3>
                <ol className='rt-image-Lista'> {contentImages}</ol>
            </div>
            <hr/>
            <div className='rt-timeline-container'>
                <div key="start" className="rt-label-container" onClick = {prev}>
                    {this.topLabel}
                </div>
                <Whirligig className='rt-timeline'
                    visibleSlides={6}
                    gutter="0.5em"
                    ref={(_whirligigInstance) => { whirligig = _whirligigInstance}}
                >
                    {contentInfo}
                </Whirligig>
                <div key="end" className="rt-label-container" onClick = {next}>
                    {this.bottomLabel}
                </div>
            </div>

            <ToastContainer
                hideProgressBar={true}
                newestOnTop={true}
                autoClose={5000}
            />

            <Simplert
                showSimplert={showAlert}
                type={typeAlert}
                title={titleAlert}
                message={messageAlert}
                onClose = {()=> location.href = '/dashboard'}
                // onClose = {this.salir()}
     
            />

            <ModalVideo 
                channel='youtube' 
                isOpen={this.state.isOpen} 
                videoId='VAh41sM8ijU' 
                onClose={() => this.setState({isOpen: false})} 
            />
        </div>
        );
    }
}
