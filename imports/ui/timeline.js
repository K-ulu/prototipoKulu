import R from 'ramda';
import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
//Para las notificaciones!
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import ScrollMenu from 'react-horizontal-scrolling-menu';
// require('../client/styles/App.css');
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';

propTypes = {
    dateIF: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    descripcion: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    buttonText: PropTypes.string,
    id: PropTypes.string.isRequired,
    fecha: PropTypes.string.isRequired,
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
    const {imageUrl} = props.imagen; //=props.event
    const {id} = props.imagen; //=props.event

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
        <svg viewBox="0 0 6 8" className='rt-arrow'>
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
        <svg viewBox="0 0 6 8" className='rt-arrow2'>
            <g>
                <path d="M 0 0 L 6 4 L 0 8 L 0 0"/>
            </g>
        </svg>
    </div>;
};

export default class Timelime extends Component {
    static total=0;
    static displayName = 'Timeline';
    static topLabel;
    static bottomLabel;

    // static dataImagenes = "";
    static idOriginal="";
    static urlOriginal="";

    static propTypes = {
        reverseOrder: PropTypes.bool
    };

    getStateForProps(props) {
        const {events,imagenes, reverseOrder} = props;
        const sortedEvents = R.sortBy(R.prop('date'), events || []);
        const sortedImagenes = imagenes; //Este se declara por que son dos variables que mando por props
        return {
            events: reverseOrder ? R.reverse(sortedEvents) : sortedEvents,
            imagenes: sortedImagenes //Lo agrego
        };
    }

    constructor(props) {
        super(props);
        this.state = this.getStateForProps(props);
    }

    componentWillReceiveProps(newProps) {
        this.setState(this.getStateForProps(newProps));
    }

    onDragStart = (ev, props) =>{
        this.idOriginal = props.imagen.id; //=props.event.id
        this.urlOriginal = props.imagen.imageUrl; ////=props.event.imageUrl
        console.log("dragstart:", ev);
    }
    
    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (e,props, cat)=>{
        var {id} = props.event;

        var divID = "div"+id;
        id ="idO"+id;

       if (id == "idO"+ this.idOriginal){
            document.getElementById(id).src = this.urlOriginal;
            document.getElementById(divID).remove();
            return(
                toast.info('🦄Correctoo!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000
                })
            );
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
        var {id} = event;
        id = "idO"+id;
        const content = <div className='rt-content'>
            <div className="rt-header-container">
                <HeaderClass event={event}/>
            </div>
            <div className='rt-image-container' 
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e,{event},"complete")}
            >
                <img id={id} src="" className='rt-image'/>
                <TextBodyClass event={event}/>
            </div>
            <div className='rt-footer-container'>
                <FooterClass event={event}/>
            </div>
        </div>;
        // Haciendo cambios
        if (index >= this.total){
            return(
                <li className={index === this.total ? 'rt-event rt-offset-second' : 'rt-event rt-offset3'} key={index}>
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

        const startLabel = (<div key="start" className="rt-label-container">
            <DefaultStartLabel event={startEvent}/>
        </div>);
        const endLabel = (<div key="end" className="rt-label-container">
            <DefaultEndLabel event={endEvent}/>
        </div>);

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

    contentForEventImages(imagen, index, ImageBodyClass) { //este prodia recibir event en vez de imagen pero como se manejan 2 variables en los props
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

        const {imagenes} = this.state; //const {events} se declararia pero como aqui solo sirve para las imagenes

        const clear = <li key='clear' className='rt-clear'>{}</li>;

        // Compose labels and events together
        return R.pipe(
            R.addIndex(R.reduce)((accum, imagen, index) => {
                const content = this.contentForEventImages(imagen, index, DefaultImageBody);
                return R.append(content, accum);
            }, [clear])
        )(imagenes); //podria mandar events pero mando imagenes por que ahi tengo almacenadas las url
    }

    render() {
        const {events} = this.state;
        const {imagenes} = this.state;

        this.total = events.length;
        this.total = this.total/2;
        if (this.total % 1 != 0) {
            this.total+=.5;
        } 

        //mandamos a llamar a la función content el cual nos permitira crear nuestra línea del tiempo
        const contentInfo = (events && events.length) ? this.content() : <div></div>;//Comprobamos que tengamos datos
        const contentImages = (imagenes && imagenes.length) ? this.contentImages() : <div></div>;

        return (
        <div> 
            <div className = "rt-menu">
                <ul>
                    <li className="green"><div>Limpiar</div></li>
                    <li className="yellow"><div>Mostrar todo</div></li>
                    <li className="red"><div>Artefacto</div></li>
                    <li className="blue"><div>Personaje</div></li>
                    <li className="purple"><div>evento</div></li>
                </ul>
            </div>
            <div>
                <div className = "rt-container-image" >
                    <h2>Imagenes:</h2>
                    <ol className='rt-image-Lista'> {contentImages}</ol>
                </div>
                <hr/>
                <div className='rt-timeline-container'>
                    {/* {this.topLabel}
                    <ul className='rt-timeline'>{contentInfo}</ul>
                    {this.bottomLabel} */}

                    <Slider>
                    {/* {this.topLabel} */}
                    <ul className='rt-timeline'>{contentInfo}</ul>
                    {/* {this.bottomLabel} */}
                    </Slider>
                    {/* <ScrollMenu
                        ref={el => this.contentInfo = el}
                        data={contentInfo}
                        arrowLeft={this.topLabel}
                        arrowRight={this.bottomLabel}
                    /> */}

                </div>
            </div>

            <ToastContainer
                hideProgressBar={true}
                newestOnTop={true}
                autoClose={5000}
            />
        </div>
        );
    }
}
