import React, { Component } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';

class LoginComponent extends Component {
    state = {
        time: Date(),
        isUserLoggedIn: false,
        profileObject: {},
        tokenObject: {}
    }

    componentDidMount() {
        let current_datetime = new Date();

        this.setState({
            time: current_datetime
        })
    }

    jsDateToEpoch(date){
        // d = javascript date obj
        // returns epoch timestamp
        return (date.getTime()-date.getMilliseconds())/1000;
    }

    responseGoogle = (response) => {
        console.log(response);

        this.setState({
            profileObject: response.profileObj,
            tokenObject: response.tokenObj
        })

        const responseObject = {
            profileObject: this.state.profileObject,
            tokenObject: this.state.tokenObject
        }

        // Send http post-request to the following endpoint
        axios.post('http://localhost:5000/users/add', responseObject)
        .then(
            this.setState({
                isUserLoggedIn: true
            })
        )
    }

    logout = () => {
        this.setState({
            isUserLoggedIn: false
        })
    };

    logoutFail() {
        console.log("A problem was detected when you tried to logout. Please try again.")
    }

    render() { 
        return ( 
            <div className="login-wrapper">
                <div className="login-container">
                    {!this.state.isUserLoggedIn && 
                        <>
                            <GoogleLogin
                                clientId="1096045067364-n81mac1vk2nrgvgpqnb756a4r21i93us.apps.googleusercontent.com"
                                buttonText="Login"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </>
                    }
                    {this.state.isUserLoggedIn &&
                        <>
                            <GoogleLogout
                                clientId="1096045067364-n81mac1vk2nrgvgpqnb756a4r21i93us.apps.googleusercontent.com"
                                buttonText="Logout"
                                onLogoutSuccess={this.logout}
                                onFailure={this.logoutFail}
                            />
                            <p>Welcome: {this.state.profileObject.name}</p>
                            <p>Email: {this.state.profileObject.email}</p>
                            <img src={this.state.profileObject.imageUrl} alt=""/>
                        </>
                    }
                </div>
            </div>
        );
    }
}

export default LoginComponent;


// 1. Save user info in the database the first time he/she logs in

// 2. If the users Access_token is still valid, keep displaying user info on the page till the user logs out. 