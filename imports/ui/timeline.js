import R from 'ramda';
import React, {Component} from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import ActionViewArray from 'material-ui/SvgIcon';

const Event =  propTypes = {
    date: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    buttonText: PropTypes.string,
    extras: PropTypes.object
};
/*
  const Event = PropTypes.shape({
    date: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    buttonText: PropTypes.string,
    extras: PropTypes.object
});
*/

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
    return <div>
        <img src={imageUrl} className='rt-image'/>
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
        <svg viewBox="0 0 8 10" className='rt-dot'>
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
    static propTypes = {
        // events: PropTypes.arrayOf(Event).isRequired,
        reverseOrder: PropTypes.bool,
        customStartLabel: PropTypes.func,
        customEndLabel: PropTypes.func,
        customHeader: PropTypes.func,
        customImageBody: PropTypes.func,
        customTextBody: PropTypes.func,
        customFooter: PropTypes.func
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

    contentForEvent(event, index, HeaderClass, ImageBodyClass, TextBodyClass, FooterClass) {
        const content = <div className='rt-content'>
            <div className="rt-header-container">
                <HeaderClass event={event}/>
            </div>
            <div className='rt-image-container'>
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
        // return <li className={index === this.total ? 'rt-event rt-offset-second' : 'rt-event'} key={index}>
        //     <div className='rt-backing'>
        //         {content}
        //         <ArrowAndDot/>
        //     </div>
        // </li>;
    }

    content() {
        const {
            reverseOrder,
            customStartLabel,
            customEndLabel,
            customHeader,
            customFooter,
            customTextBody,
            customImageBody
        } = this.props;
        const {events} = this.state;

        // Determine which component classes to use
        const StartClass = customStartLabel || DefaultStartLabel;
        const EndClass = customEndLabel || DefaultEndLabel;
        const HeaderClass = customHeader || DefaultHeader;
        const ImageBodyClass = customImageBody || DefaultImageBody;
        const TextBodyClass = customTextBody || DefaultTextBody;
        const FooterClass = customFooter || DefaultFooter;

        // Build start & end labels
        const startEvent = (reverseOrder ? R.last : R.head)(events);
        const endEvent = (!reverseOrder ? R.last : R.head)(events);
        // const startLabel = (<li key="start" className="rt-label-container">
        //     <StartClass event={startEvent}/>
        // </li>);
        // const endLabel = (<li key="end" className="rt-label-container">
        //     <EndClass event={endEvent}/>
        // </li>);
        // const topLabel = reverseOrder ? endLabel : startLabel;
        // const bottomLabel = !reverseOrder ? endLabel : startLabel;

        const startLabel = (<div key="start" className="rt-label-container">
            <StartClass event={startEvent}/>
        </div>);
        const endLabel = (<div key="end" className="rt-label-container">
            <EndClass event={endEvent}/>
        </div>);

        this.topLabel = reverseOrder ? endLabel : startLabel;
        this.bottomLabel = !reverseOrder ? endLabel : startLabel;
        
        const clear = <li key='clear' className='rt-clear'>{}</li>;

        // Compose labels and events together
        return R.pipe(
            R.addIndex(R.reduce)((accum, event, index) => {
                const content = this.contentForEvent(event, index, HeaderClass, ImageBodyClass, TextBodyClass, FooterClass);
                return R.append(content, accum);
            // }, [topLabel]),
            // R.append(clear),
            // R.append(bottomLabel)
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
        console.log(this.total);

        const content = (events && events.length) ? this.content() : <div></div>;
        console.log(content);
        return (
        <div className='rt-timeline-container'>
            {this.topLabel}
              <ul className='rt-timeline'>
                  {content}
              </ul>
            {this.bottomLabel}
        </div>
        );
    }
}