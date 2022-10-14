import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { GoogleLogout } from 'react-google-login';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

function LoginComponent(props) {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);
    const [profileObject, setProfileObject] = useState(null);

    // state = {
    //     time: Date(),
    // }

    // componentDidMount() {
    //     let current_datetime = new Date();

    //     this.setState({
    //         time: current_datetime
    //     })
    // }

    // jsDateToEpoch(date){
    //     // d = javascript date obj
    //     // returns epoch timestamp
    //     return (date.getTime()-date.getMilliseconds())/1000;
    // }

    const responseGoogle = (response) => {
        console.log(response)

        setProfileObject(response.profileObj)

        const responseObject = {
            profileObject: response.profileObj,
            tokenObject: response.tokenObj
        }

        axios.post('http://localhost:5000/users/add', responseObject) // Send http post-request to the following endpoint
            .then(setUserIsLoggedIn(true))
    }

    const logout = () => {
        console.log("You are now logged out.")
        setUserIsLoggedIn(false)
    }

    const logoutFail = () => {
        console.log("A problem was detected when you tried to logout. Please try again.")
    }
    
    return (
        <Dialog open={props.open}>
            <DialogTitle sx={{mx: 'auto'}}>Edit stats</DialogTitle>
            <DialogContent>
                <div className="login-wrapper">
                    <div className="login-container">
                        {!userIsLoggedIn &&
                            <>
                                <GoogleLogin
                                    clientId={process.env.REACT_APP_CLIENT_ID}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </>
                        }
                        {userIsLoggedIn &&
                            <>
                                <GoogleLogout
                                    clientId={process.env.REACT_APP_CLIENT_ID}
                                    buttonText="Logout"
                                    onLogoutSuccess={logout}
                                    onFailure={logoutFail}
                                />
                                <p>Welcome: {profileObject.name}</p>
                                <img src={profileObject.imageUrl} alt=""/>
                            </>
                        }
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="warning" onClick={props.onClose}>Close</Button>
            </DialogActions>
        </Dialog> 
        
    );
}

export default LoginComponent;


// 1. Save user info in the database the first time he/she logs in

// 2. If the users Access_token is still valid, keep displaying user info on the page till the user logs out. 