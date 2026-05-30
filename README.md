# ThreadHive Frontend

A Reddit-style forum application built with React and Redux Toolkit. Users can browse threads, post comments, vote on content, and manage their profile — all backed by a REST API.

---

## Features

- **Authentication** — Register and log in; session persisted via localStorage
- **Home Feed** — Browse all threads with sort options (Newest, Most Upvoted) and pagination
- **Subreddit Filtering** — Filter threads by community via sidebar navigation
- **Thread View** — Read a full thread and its comments
- **Voting** — Upvote or downvote threads and comments
- **Comment System** — Post comments on threads
- **Create Thread** — Post a new thread to an existing or new community
- **User Profile** — View and edit your profile details
- **Dark Mode** — Toggle between light and dark themes

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | React 19 |
| Build Tool | Vite |
| State Management | Redux Toolkit + React Redux |
| Routing | React Router v7 |
| HTTP Client | Axios |
| UI Components | React Bootstrap + Bootstrap 5 |
| Icons | Bootstrap Icons |
| Testing | Vitest + Testing Library + MSW |

---

## Project Structure

```
src/
├── App.jsx                  # Root component — routing and Redux Provider
├── main.jsx                 # Entry point
├── api/
│   └── axiosInstance.js     # Axios instance with auth interceptors
├── config/
│   └── apiConfig.js         # All API endpoint constants
├── components/
│   ├── Comment/             # CommentForm, CommentList
│   ├── Footer/              # Footer
│   ├── Forms/               # CreateThreadForm
│   ├── Header/              # Header with nav and dark mode toggle
│   ├── PrivateRoute/        # Auth-guarded route wrapper
│   ├── Shared/              # VoteButtons, FilterSortBar, PaginationComponent
│   ├── Sidebar/             # Navigation sidebar
│   └── ThreadList/          # ThreadCard, ThreadList
├── pages/
│   ├── Auth/                # Login, Register
│   └── User/                # Home, ThreadPage, Profile
├── reducers/                # Redux slices (auth, threads, comments, subreddits, theme)
├── services/                # API call functions called by Redux thunks
├── store/
│   └── store.js             # Redux store configuration
├── tests/
│   ├── setup.js             # Vitest + MSW setup
│   ├── mocks/               # Mock data and MSW handlers
│   └── integration/         # Integration test suites
└── utils/
    └── handleApiError.js    # Consistent API error handler
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- The [ThreadHive backend](../threadhive-backend) running on `http://localhost:3000`

### Installation

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

---

## Running Tests

```bash
npm test
```

Tests use **Vitest** with **MSW** to intercept API calls — no backend required.

The test suite covers two integration flows:

- **Thread flow** — fetch threads, create thread, upvote/downvote, fetch by ID, handle not found
- **Comment flow** — fetch comments, add comment, upvote/downvote comment

---

## Backend

This frontend requires the ThreadHive backend API. See the backend README for setup instructions. By default it runs at `http://localhost:3000/api`.

---

## Environment

No `.env` file is needed for the frontend. The API base URL is configured in `src/api/axiosInstance.js`.

---

## License

This project is for educational purposes.
