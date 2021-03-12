import React, { Component, createContext } from 'react';

import { auth, createUserProfileDocument } from '../firebase';


export const UserContext = createContext();

class UsersProvider extends Component {
    state = { user: null };

    unsubscribeFromAuth = null;

    componentDidMount = () => {
        this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {    // When user signs in/logs in or out, auth.onAuthStateChanged returns a user object or a null
            const user = await createUserProfileDocument(userAuth);               // Sign in: userAuth = {...}  Sign out: userAuth = null (probably, I guess)
            this.setState({ user });
            // console.log(this.state.user);
        });
    }

    componentWillUnmount = () => {
        this.unsubscribeFromAuth();
    }
  
    render() {
        const { user } = this.state;
        const { children } = this.props;

        return(
            <UserContext.Provider value={user}>{ children }</UserContext.Provider>
        )
    }
}


export default UsersProvider;