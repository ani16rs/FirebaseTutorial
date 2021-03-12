import React, { Component, createContext } from 'react';

import { firestore } from '../firebase';
import { collectIdsAndDocs } from '../utilities';


export const PostContext = createContext();

class PostsProvider extends Component {
    state = { posts: [] }

    unsubscribeFromFirestore = null;

    componentDidMount = () => {
        // Fetching data manually       : collection('posts').get()
        // Fetching data automatically  : collection('posts').onSnapshot() -- aka Subscribing to DB
        this.unsubscribeFromFirestore = firestore.collection('posts').orderBy('createdAt', 'desc').onSnapshot(snapshot => {
            const posts = snapshot.docs.map(collectIdsAndDocs);
            this.setState({ posts });
        });
    }

    componentWillUnmount = () => {
        this.unsubscribeFromFirestore();
    }
  
    render() {
        const { posts } = this.state;
        const { children } = this.props;

        return(
            <PostContext.Provider value={posts}>{ children }</PostContext.Provider>
        )
    }
}


export default PostsProvider;