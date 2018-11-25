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

propTypes = {
    dateIF: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    buttonText: PropTypes.string,
    id: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
    usado: PropTypes.string.isRequired
};

const DefaultStartLabel = (props) => {
    const {event} = props;
    return <div className="rt-label">
        {moment(event.date).year()}
    </div>;
};

const DefaultEndLabel = (props) => {
    const {event} = props;
    return <div className="rt-label">
        {moment(event.date).year()}
    </div>;
};

const DefaultHeader = (props) => {
    const {fecha, title} = props.event;
    return <div>
        <h2 className='rt-title'>{title}</h2>
        <p className='rt-date'>{fecha}</p>
    </div>;
};

const DefaultFooter = (props) => {
    const {buttonText, onClick} = props.event;
    const handleClick = (e) => {
        e.preventDefault();
        (onClick || function () {})(e);
    };
    return <a className='rt-btn' href='#' onClick={handleClick}>{buttonText || 'Default Text'}</a>
};

const DefaultImageBody = (props) =>{
    const {imageUrl} = props.imagen; 
    const {id} = props.imagen; 

    return <div>         
        <img id={id} src={imageUrl} className='rt-image'/>
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

    static boolActivado = false;
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
            messageAlert: 'Victoria!!!!!'
        };
    }

    constructor(props) {
        super(props);
        this.state = this.getStateForProps(props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.events != null && newProps.imagenes != null && newProps.contador!=null){
            if (newProps.contador==2){
                this.boolActivado = false;
                this.setState ({
                    imagenes: newProps.imagenes
                });
            }
            else{
                if (this.boolActivado == false || this.boolActivado == undefined){
                    this.setState(this.getStateForProps(newProps));
                }
            }
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
        // console.log("dragstart:", ev);
    }
    
    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (e,props, cat)=>{
        var {id} = props.event;
        id ="idO"+id;

       if (id == "idO"+ this.idOriginal){
            Meteor.call('elemento.usado', this.idOriginal,  (err, res) => {
                if (!err) {
                  console.log("editado en elementos");
                } else {
                  console.log(err.reason);
                }
            });

            document.getElementById(id).src = this.urlOriginal;
            let newImages = this.state.imagenes;
            
            const result = newImages.filter(word => word.id != this.idOriginal);

            console.log(result.length);
            this.setState ({
                imagenes: result
            });
            this.boolActivado = true;
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

    contentForEvent(event, index, HeaderClass, TextBodyClass, FooterClass) {
        var {usado} = event;
        // console.log(usado);
        var {id} = event;
        let link = ElementosObjetosAprendizaje.findOne({_id: id}).link();  //The "view/download" link
        // console.log(link);

        id = "idO"+id;
        const content = <div className='rt-content'>
            <div className="rt-header-container">
                <HeaderClass event={event}/>
            </div>
            <div className='rt-image-container' 
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e,{event},"complete")}
            >
            {usado == "true" ? <img id={id} src= {link} className='rt-image'/> : <img id={id} src="" className='rt-image'/> }
                <TextBodyClass event={event}/>
            </div>
            <div className='rt-footer-container'>
                <FooterClass event={event}/>
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

        // Build start & end labels
        const startEvent = (reverseOrder ? R.last : R.head)(events);
        const endEvent = (!reverseOrder ? R.last : R.head)(events);

        const startLabel = <DefaultStartLabel event={startEvent}/>;
        const endLabel = <DefaultEndLabel event={endEvent}/>;

        this.topLabel = reverseOrder ? endLabel : startLabel;
        this.bottomLabel = !reverseOrder ? endLabel : startLabel;
        
        const clear = <li key='clear' className='rt-clear'>{}</li>;

        // Compose labels and events together
        return R.pipe(
            R.addIndex(R.reduce)((accum, event, index) => {
                const content = this.contentForEvent(event, index, DefaultHeader,  DefaultTextBody, DefaultFooter);
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

    render() {
        let { showAlert, typeAlert, titleAlert, messageAlert } = this.state
        const {events} = this.state;
        const {imagenes} = this.state;
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
                    visibleSlides={5}
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
            />
        </div>
        );
    }
}
