import React, {Component} from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';
import blueMarkerUrl from '../assets/images/blue-marker.svg';

class AroundMarker extends Component {

    state = {
        isOpen: false
    };

    render() {
        const { isOpen } = this.state;
        const { url, user, message, location, type } = this.props.post;
        const isImagePost = type === 'image';
        const customIcon = isImagePost ? undefined : {
            url: blueMarkerUrl,
            scaledSize: new window.google.maps.Size(26, 41),
        };

        return (
            <Marker
                position={{ lat: location.lat, lng: location.lon }}
                onMouseOver={isImagePost ? this.handleToggle : undefined}
                onMouseOut={isImagePost ? this.handleToggle : undefined}
                onClick={isImagePost ? undefined: this.handleToggle}
                icon={customIcon}
            >
                {this.state.isOpen ? (
                    <InfoWindow>
                        <div>
                            {isImagePost
                                ? <img src={url} alt={message} className="around-marker-image"/>
                                : <video src={url} controls className="around-marker-video"/>}
                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow>
                ) : null}
            </Marker>
        );
    }

    handleToggle = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
}

export default AroundMarker;