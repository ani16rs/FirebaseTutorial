import React, { Component } from 'react';
import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';


import Posts from './Posts';

class Application extends Component {
  state = {
    posts: [],
  };

  unsubscribe = null;

  componentDidMount = async () => {
    // // const posts = firestore.collection('posts').get().then(snapshot => { console.log({ snapshot });});
    // const snapshot = await firestore.collection('posts').get();

    // const posts = snapshot.docs.map(collectIdsAndDocs);
    // // using arrays here but objects (key value pairs) are better in redux, it is better to store obj over array

    this.unsubscribe = firestore.collection('posts').onSnapshot(snapshot => {
      const posts = snapshot.docs.map(collectIdsAndDocs);
      this.setState({ posts });
    })

    this.componentWillUnmount = () => {
      this.unsubscribe(); 
    }

    // this.setState({ posts })
  }

  render() {
    const { posts } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        <Posts posts={posts} />
      </main>
    );
  }
}

export default Application;
