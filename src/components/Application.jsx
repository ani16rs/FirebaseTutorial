import React, { Component } from 'react';
import { firestore, auth, createUserProfileDocument } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import Authentication from './Authentication';
import CurrentUser from './CurrentUser';


import Posts from './Posts';
import SignIn from './SignIn';
import SignInAndSignUp from './SignInAndSignUp';


class Application extends Component {
  state = {
    posts: [],
    user: null,
    // userLoaded: false,
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    // Fetching data manually       : collection('posts').get()
    // Fetching data automatically  : collection('posts').onSnapshot() -- aka Subscribing to DB
    this.unsubscribeFromFirestore = firestore.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    });

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {    // When user signs in/logs in or out, auth.onAuthStateChanged returns a user object or a null
      const user = await createUserProfileDocument(userAuth);                 // Sign in: userAuth = {...}  Sign out: userAuth = null (probably, I guess)
      this.setState({ user });
      // this.setState({ user, userLoaded: true });
      // console.log(this.state.userLoaded);
      console.log(this.state.user);
    });

    this.componentWillUnmount = () => {
      this.unsubscribeFromFirestore();
      this.unsubscribeFromAuth();
    }
  }

  render() {
    const { posts, user, userLoaded } = this.state;
    const userInformation = user ? <CurrentUser {...user} /> : <SignInAndSignUp />

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        {/* { userLoaded && userInformation } */}
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
