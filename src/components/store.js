import { configureStore } from '@reduxjs/toolkit';
import SubredditsReducer from '../features/subReddits/subRedditsSlice';
import PostsReducer from "../features/posts/postsSlice";
import CommentsReducer from "../features/comments/commentsSlice"

export default configureStore({
    reducer: {
        subreddit: SubredditsReducer,
        post: PostsReducer,
        comments: CommentsReducer
    }      
});
