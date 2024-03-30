import React, { Component } from 'react';
import SignUp from '../pages/register';
import SignIn from '../pages/signin';
import Overlay from './overlay';

class Formfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rightPanelActive: false,
        };
        this.handleClickSignUpButton = this.handleClickSignUpButton.bind(this);
        this.handleClickSignInButton = this.handleClickSignInButton.bind(this);
    }

    handleClickSignUpButton() {
        this.setState({
            rightPanelActive: true,
        });
    }

    handleClickSignInButton() {
        this.setState({
            rightPanelActive: false,
        });
    }

    render() {
        const { rightPanelActive } = this.state;
        const containerClassName = `container ${rightPanelActive ? `right-panel-active` : ``}`;
        return (
            <div className="thecoolthing">
                <div className={containerClassName} id="container2">
                    <SignUp />
                    <SignIn />
                    <Overlay
                        handleClickSignInButton={this.handleClickSignInButton}
                        handleClickSignUpButton={this.handleClickSignUpButton}
                    />
                </div>
            </div>
        );
    }
}

export default Formfile;
