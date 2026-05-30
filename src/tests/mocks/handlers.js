import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { mockThread, mockThread2, mockComment } from './data';

const BASE = 'http://localhost:3000/api';

export const handlers = [
  // Threads
  http.get(`${BASE}/threads`, () => {
    return HttpResponse.json({ data: [mockThread, mockThread2] });
  }),

  http.get(`${BASE}/threads/:id`, ({ params }) => {
    if (params.id === mockThread._id) {
      return HttpResponse.json({ data: mockThread });
    }
    return HttpResponse.json({ message: 'Thread not found' }, { status: 404 });
  }),

  http.post(`${BASE}/threads`, async ({ request }) => {
    const body = await request.json();
    const newThread = { _id: 'thread-new', ...body, voteCount: 0, upvotedBy: [], downvotedBy: [] };
    return HttpResponse.json({ data: newThread }, { status: 201 });
  }),

  http.post(`${BASE}/threads/:id/upvote`, ({ params }) => {
    return HttpResponse.json({ data: { ...mockThread, _id: params.id, voteCount: mockThread.voteCount + 1 } });
  }),

  http.post(`${BASE}/threads/:id/downvote`, ({ params }) => {
    return HttpResponse.json({ data: { ...mockThread, _id: params.id, voteCount: mockThread.voteCount - 1 } });
  }),

  // Comments
  http.get(`${BASE}/comments/thread/:threadId`, () => {
    return HttpResponse.json({ data: [mockComment] });
  }),

  http.post(`${BASE}/comments`, async ({ request }) => {
    const body = await request.json();
    const newComment = {
      _id: 'comment-new',
      content: body.content,
      thread: body.thread,
      user: { _id: 'user-1', name: 'Alice' },
      voteCount: 0,
      upvotedBy: [],
      downvotedBy: [],
    };
    return HttpResponse.json({ data: newComment }, { status: 201 });
  }),

  http.post(`${BASE}/comments/:id/upvote`, ({ params }) => {
    return HttpResponse.json({ data: { ...mockComment, _id: params.id, voteCount: mockComment.voteCount + 1 } });
  }),

  http.post(`${BASE}/comments/:id/downvote`, ({ params }) => {
    return HttpResponse.json({ data: { ...mockComment, _id: params.id, voteCount: mockComment.voteCount - 1 } });
  }),
];

export const server = setupServer(...handlers);
