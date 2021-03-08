import React, { Component } from 'react';
import { firestore, auth } from '../firebase';
import { collectIdsAndDocs } from '../utilities';
import Authentication from './Authentication';


import Posts from './Posts';

class Application extends Component {
  state = {
    posts: [],
    user: null,
  };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    // // const posts = firestore.collection('posts').get().then(snapshot => { console.log({ snapshot });});
    // const snapshot = await firestore.collection('posts').get();

    // const posts = snapshot.docs.map(collectIdsAndDocs);
    // // using arrays here but objects (key value pairs) are better in redux, it is better to store obj over array

    this.unsubscribeFromFirestore = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });

      this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
        console.log(user)
        this.setState({ user });
      });
    })

    this.componentWillUnmount = () => {
      this.unsubscribeFromFirestore(); 
    }

    // this.setState({ posts })
  }

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Authentication user={user} />
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
