import { configureStore } from '@reduxjs/toolkit';
import SubredditsReducer from '../features/subReddits/subRedditsSlice';
import PostsReducer from "../features/posts/postsSlice";
import SearchReducer from "../features/search/searchSlice";
import CommentsReducer from "../features/comments/commentsSlice"
import PageReducer from "./pageSlice"

export default configureStore({
    reducer: {
        subreddit: SubredditsReducer,
        post: PostsReducer,
        search: SearchReducer,
        comments: CommentsReducer,
        page: PageReducer
    },      
});
/* Store

{
    subreddits: {
        data: {
            '1': {
                id: 1,
                title: 'Pupular',
                image: 'Image1'
            },
            '2' : {
                id: 2,
                title: 'New',
                image: 'Image'
            }
        },
        selectedSubReddit: '2',
    },
    posts: {
        subreddit1: {
          post1: {
            id: "1",
            title: 'Title1',
            image: 'Image1',
            author: 'Author1',
            date: 'Date1',
            numberOfcomments: 45,
            rating: 540
        },
          post2: {
            id: "2",
            title: 'Title2',
            image: 'Image2',
            author: 'Author2',
            date: 'Date2',
            numberOfcomments: 345,
            rating: 200
        }  
        },
        subreddit2: {
            post1: {},
            post2: {}
        }
        
    },
    comments: {
        "fhjs": {postId: "sroitn", comment: []}
    }
}
*/
