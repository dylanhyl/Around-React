import React, {Component} from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import PropTypes from 'prop-types';

class AroundMarker extends Component {

    state = {
        isOpen: false
    };

    render() {
        const { isOpen } = this.state;
        const { url, user, message, location } = this.props.post;
        return (
            <Marker
                position={{ lat: location.lat, lng: location.lon }}
                onClick={this.handleToggle}>
                {
                    isOpen ? (
                        <InfoWindow>
                            <div>
                                <img src={url} alt={message} className="around-marker-image"/>
                                <p>{`${user}: ${message}`}</p>
                            </div>
                        </InfoWindow>
                    ) : null
                }
            </Marker>
        );
    }

    handleToggle = () => {
        this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
}

export default AroundMarker;