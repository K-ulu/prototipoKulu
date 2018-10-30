import R from 'ramda';
import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
// import ActionViewArray from 'material-ui/SvgIcon';

//const Event =  
propTypes = {
    date: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    buttonText: PropTypes.string,
    extras: PropTypes.object,
    id: PropTypes.string.isRequired
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
    const {date, title} = props.event;
    return <div>
        <h2 className='rt-title'>{title}</h2>
        <p className='rt-date'>{moment(date).format('LL')}</p>
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

const DefaultTextBody = (props) => {
    const {text} = props.event;
    return <div>
        <p>{text}</p>
    </div>;
};

const DefaultImageBody = (props) => {
    const {imageUrl} = props.event;
    const {id} = props.event;

    // return {imageUrl};
    return <div>
        <img id={id} src={imageUrl} className='rt-image'/>
    </div>;
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

// function getURL(props){
//     const {imageUrl} = props.event;
//     // console.log({imageUrl})
//     return {imageUrl};
// }

// function printURL(url){
//     console.log(url);
//     return(
//         <div>
//             <img src={url} className='rt-image'/>
//         </div>
//     );
// }

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
        const {events, reverseOrder} = props;
        const sortedEvents = R.sortBy(R.prop('date'), events || []);
        return {
            events: reverseOrder ? R.reverse(sortedEvents) : sortedEvents
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
        // const {id} = url.event;
        this.idOriginal = props.event.id;
        this.urlOriginal = props.event.imageUrl;
        console.log(this.idOriginal);
        console.log(this.urlOriginal);

        console.log("dragstart:", ev);
        // ev.dataTransfer.setData("id", id);
    }
    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev,props, cat)=>{
        console.log(props);
        const {imageUrl} = props.event;
        const {id} = props.event;

        console.log(imageUrl);
        console.log(props.event.title);
        console.log(id);
        // let id = ev.dataTransfer.getData("id");
        // console.log(id);
        document.getElementById(this.idOriginal).src = imageUrl;
        document.getElementById(id).src = this.urlOriginal;
    //     return <div>
    //     <img src={imageUrl} className='rt-image'/>
    // </div>;
    }

    contentForEvent(event, index, HeaderClass, ImageBodyClass, TextBodyClass, FooterClass) {
        // var urlEquis = "";
        // console.log(this.images);
        // urlEquis = getURL(event={event});
        // urlEquis = urlEquis.imageUrl;

        // if (this.dataImagenes == undefined){
        //     this.dataImagenes = " url: " + urlEquis;
        // }
        // else{
        //     this.dataImagenes+= " url: " + urlEquis;
        // }
        
        // this.dataImagenes = this.dataImagenes.split(" url: ");

        const content = <div className='rt-content'>
            <div className="rt-header-container">
                <HeaderClass event={event}/>
            </div>
            <div className='rt-image-container' 
                onDragStart={(e)=>this.onDragStart(e, event={event})}                    
                draggable
                onDragOver={(e)=>this.onDragOver(e)}
                onDrop={(e) => this.onDrop(e,event={event},"complete")}
            >
                <ImageBodyClass event={event}/>
            </div>
            <div className='rt-text-container'>
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
                const content = this.contentForEvent(event, index, DefaultHeader, DefaultImageBody, DefaultTextBody, DefaultFooter);
                return R.append(content, accum);
            },  [clear])
        )(events);
    }

    render() {
        const {events} = this.state;
        this.total = events.length;
        this.total = this.total/2;
        if (this.total % 1 != 0) {
            this.total+=.5;
        } 

        //mandamos a llamar a la función content el cual nos permitira crear nuestra línea del tiempo
        const content = (events && events.length) ? this.content() : <div></div>;
        console.log(content);

        // const content1="";
        // console.log(this.dataImagenes);
        // if (this.dataImages == undefined){
        //     console.log("Es indefinido");
        // }
        // else{
        //     console.log(this.dataImagenes);
        //     content1 = printURL(this.dataImagenes[1]);
        // }
        return (
        <div>
            <div>
                <h2>Imagenes</h2>
                {/* {content1} */}
            </div>
            <div className='rt-timeline-container'>
                {this.topLabel}
                <ul className='rt-timeline'>
                    {content}
                </ul>
                {this.bottomLabel}
            </div>
        </div>

        );
    }
}