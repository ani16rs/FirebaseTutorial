import React, { useContext } from 'react'

import Post from './Post';
import AddPost from './AddPost';
import { PostContext } from '../providers/PostsProvider';


const Posts = () => {
  const posts = useContext(PostContext);    // using Hooks

  return (
    <section className="Posts">
      <AddPost />
        { posts.map(post => <Post {...post} key={post.id} />) }

      {/* Do the previous thing or this. Prev one is preferred I guess. */}
      {/* <PostContext.Consumer>
        { posts => posts.map(post => <Post {...post} key={post.id} />) }
      </PostContext.Consumer> */}
    </section>
  )
}

export default Posts;
