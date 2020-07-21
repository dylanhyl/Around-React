import React, {Component} from 'react';
import logo from '../assets/images/logo.svg';
import { Button } from "antd";

class TopBar extends Component {

    render() {
        let button = null

        if (this.props.isLoggedIn) {
            button = <Button className="logout" icon="logout" onClick={this.props.handleLogout}>
                Logout
            </Button>
        }
        return (
            <header className="App-header">
                <img src={logo} alt="logo" className="App-logo"/>
                <span className="App-title">Around</span>
                {button}
            </header>
        );
    }
}

export default TopBar;
