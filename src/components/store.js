import { configureStore } from '@reduxjs/toolkit';
import SubredditsReducer from '../features/subReddits/subRedditsSlice';
import PostsReducer from "../features/posts/postsSlice";
import CommentsReducer from "../features/comments/commentsSlice"
import PageReducer from "./pageSlice"

export default configureStore({
    reducer: {
        subreddit: SubredditsReducer,
        post: PostsReducer,
        comments: CommentsReducer,
        page: PageReducer
    }      
});
