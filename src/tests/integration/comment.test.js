import { configureStore } from '@reduxjs/toolkit';
import { mockComment } from '../mocks/data';
import commentReducer, {
  fetchComments,
  addComment,
  upvoteCommentThunk,
  downvoteCommentThunk,
} from '../../reducers/commentSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      comments: commentReducer,
    },
  });

describe('Comment flow', () => {
  let store;

  beforeEach(() => {
    store = makeStore();
  });

  it('fetches comments for a thread and populates state', async () => {
    await store.dispatch(fetchComments('thread-1'));
    const { comments } = store.getState().comments;
    expect(comments).toHaveLength(1);
    expect(comments[0]._id).toBe(mockComment._id);
    expect(comments[0].content).toBe(mockComment.content);
  });

  it('adds a comment and appends it to state', async () => {
    await store.dispatch(fetchComments('thread-1'));
    await store.dispatch(addComment({ threadId: 'thread-1', content: 'New comment here' }));
    const { comments } = store.getState().comments;
    expect(comments).toHaveLength(2);
    expect(comments[1].content).toBe('New comment here');
  });

  it('upvotes a comment and updates voteCount', async () => {
    await store.dispatch(fetchComments('thread-1'));
    const before = store.getState().comments.comments[0].voteCount;
    await store.dispatch(upvoteCommentThunk(mockComment._id));
    const after = store.getState().comments.comments[0].voteCount;
    expect(after).toBe(before + 1);
  });

  it('downvotes a comment and updates voteCount', async () => {
    await store.dispatch(fetchComments('thread-1'));
    const before = store.getState().comments.comments[0].voteCount;
    await store.dispatch(downvoteCommentThunk(mockComment._id));
    const after = store.getState().comments.comments[0].voteCount;
    expect(after).toBe(before - 1);
  });
});
