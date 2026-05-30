import { configureStore } from '@reduxjs/toolkit';
import { http, HttpResponse } from 'msw';
import { server } from '../mocks/handlers';
import { mockThread, mockThread2 } from '../mocks/data';
import threadReducer, {
  fetchThreads,
  createThreadThunk,
  upvoteThreadThunk,
  downvoteThreadThunk,
} from '../../reducers/threadListSlice';
import currentThreadReducer, {
  fetchThreadById,
} from '../../reducers/currentThreadSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      threads: threadReducer,
      currentThread: currentThreadReducer,
    },
  });

describe('Thread flow', () => {
  let store;

  beforeEach(() => {
    store = makeStore();
  });

  it('fetches threads and populates state', async () => {
    await store.dispatch(fetchThreads());
    const { threads } = store.getState().threads;
    expect(threads).toHaveLength(2);
    expect(threads[0]._id).toBe(mockThread._id);
    expect(threads[0].title).toBe(mockThread.title);
  });

  it('creates a thread and adds it to state', async () => {
    const newData = { title: 'New Thread', content: 'Content here', subredditName: 'node' };
    await store.dispatch(createThreadThunk(newData));
    const { threads } = store.getState().threads;
    expect(threads.some((t) => t.title === 'New Thread')).toBe(true);
  });

  it('upvotes a thread and updates voteCount', async () => {
    await store.dispatch(fetchThreads());
    const before = store.getState().threads.threads[0].voteCount;
    await store.dispatch(upvoteThreadThunk(mockThread._id));
    const after = store.getState().threads.threads[0].voteCount;
    expect(after).toBe(before + 1);
  });

  it('downvotes a thread and updates voteCount', async () => {
    await store.dispatch(fetchThreads());
    const before = store.getState().threads.threads[0].voteCount;
    await store.dispatch(downvoteThreadThunk(mockThread._id));
    const after = store.getState().threads.threads[0].voteCount;
    expect(after).toBe(before - 1);
  });

  it('fetches a thread by ID and populates currentThread', async () => {
    await store.dispatch(fetchThreadById(mockThread._id));
    const { thread } = store.getState().currentThread;
    expect(thread).not.toBeNull();
    expect(thread._id).toBe(mockThread._id);
    expect(thread.title).toBe(mockThread.title);
  });

  it('sets error when thread is not found', async () => {
    server.use(
      http.get('http://localhost:3000/api/threads/:id', () =>
        HttpResponse.json({ message: 'Thread not found' }, { status: 404 })
      )
    );
    await store.dispatch(fetchThreadById('nonexistent-id'));
    const { error } = store.getState().currentThread;
    expect(error).not.toBeNull();
  });
});
