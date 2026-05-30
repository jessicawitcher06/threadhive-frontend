export const mockUser = {
  _id: 'user-1',
  name: 'Alice',
  email: 'alice@example.com',
};

export const mockToken = 'mock-jwt-token';

export const mockThread = {
  _id: 'thread-1',
  title: 'How do I learn Node.js?',
  content: 'I am new to backend and want to learn Node.js. Any good resources?',
  subredditName: 'node',
  author: { _id: 'user-1', name: 'Alice' },
  voteCount: 2,
  upvotedBy: ['user-2', 'user-3'],
  downvotedBy: [],
};

export const mockThread2 = {
  _id: 'thread-2',
  title: 'Best way to manage state in React?',
  content: 'Should I use Context, Redux, or Zustand?',
  subredditName: 'reactjs',
  author: { _id: 'user-2', name: 'Bob' },
  voteCount: 0,
  upvotedBy: [],
  downvotedBy: [],
};

export const mockComment = {
  _id: 'comment-1',
  content: 'Great question! Start with the official docs.',
  thread: 'thread-1',
  user: { _id: 'user-2', name: 'Bob' },
  voteCount: 1,
  upvotedBy: ['user-1'],
  downvotedBy: [],
};
