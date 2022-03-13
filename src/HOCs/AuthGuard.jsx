import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signOut, getUser } from '../actions/auth';


export default (OriginalComponent, header = false) => {
    class MixedComponent extends Component {
        constructor(props) {
            super(props)
            props.getUser()
        }

        checkAuth() {
            const { isAuth, username, history } = this.props;
            if (!header && !isAuth && !username) {
                history.push('/signin');
            } 
        }

        componentDidMount() {
            this.checkAuth();
        }

        componentDidUpdate() {
            this.checkAuth();
        }

        render() {
            if (this.props.token) localStorage.setItem('JWT_TOKEN', this.props.token);
            return <OriginalComponent {...this.props} />;
        }
    }

    return connect(state => ({
        isAuth: state.auth.isAuthenticated,
        username: state.auth.username,
        token: state.auth.token
    }),
    {
        signOut,
        getUser
    })(MixedComponent);
};
