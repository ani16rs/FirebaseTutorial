import React from 'react';
import { render } from 'react-dom';

import './index.scss';

import Application from './components/Application';
import PostsProvider from './providers/PostsProvider';
import UsersProvider from './providers/UserProvider';


render(
    <UsersProvider>
        <PostsProvider>
            <Application />
        </PostsProvider>
    </UsersProvider>,
    document.getElementById('root')
);
