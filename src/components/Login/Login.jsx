import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';
import {loginWithGoogle} from "./auth";
import {firebaseAuth} from "./config";


const firebaseAuthKey = "firebaseAuthInProgress";
const appTokenKey = "appToken";

class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            splashScreen: false
        };

    }

    handleGoogleLogin = () => {
        loginWithGoogle()
            .catch(function (error) {
                alert(error); // or show toast
                localStorage.removeItem(firebaseAuthKey);
            });
        localStorage.setItem(firebaseAuthKey, "1");
    }

    componentWillMount() {
        if (localStorage.getItem(appTokenKey)) {
            console.log(localStorage.getItem(appTokenKey))
            this.props.history.push("library");
            return;
        }

        firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                console.log("User signed in: ", JSON.stringify(user));

                localStorage.removeItem(firebaseAuthKey);

                // here you could authenticate with you web server to get the
                // application specific token so that you do not have to
                // authenticate with firebase every time a user logs in
                localStorage.setItem(appTokenKey, user.uid);

                // store the token
                this.props.history.push("library")
            }
        });
    }

    render() {
        const { classes } = this.props;
        console.log(firebaseAuthKey + "=" + localStorage.getItem(firebaseAuthKey));
        if (localStorage.getItem(firebaseAuthKey) === "1") return <SplashScreen />;
        return (
        <div>
            <div>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.handleGoogleLogin}>
                    Sign in with Google
                </Button>
            </div>
        </div>)
    }
}
const styles = theme => ({
    button: {
      margin: theme.spacing.unit,
    },
    input: {
      display: 'none',
    },
  });
const SplashScreen = () => (<p>Loading...</p>)

Login.propTypes = {
    classes: PropTypes.object.isRequired,
  };
export default withRouter(withStyles(styles)(Login));