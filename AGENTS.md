# ThreadHive Frontend – Copilot Agent Instructions

## Project Overview
ThreadHive is a Reddit-style forum application. This repository contains the **React frontend** only. The backend is a separate Express/MongoDB API running on `http://localhost:3000`.

## Tech Stack
- **React 19** with **Vite**
- **Redux Toolkit** (`@reduxjs/toolkit`, `react-redux`) for all global state
- **React Router v7** for client-side routing
- **Axios** for all HTTP requests (via a shared instance in `src/api/axiosInstance.js`)
- **React Bootstrap + Bootstrap 5** for UI components and styling
- **Bootstrap Icons** for icons

## Project Structure
```
src/
  App.jsx               # Root component – routing and Redux Provider
  main.jsx              # Entry point
  api/
    axiosInstance.js    # Axios instance (baseURL, auth interceptors)
  config/
    apiConfig.js        # All API endpoint constants
  components/           # Reusable UI components
  pages/
    Auth/               # Login, Register
    User/               # Home, ThreadPage, Profile
  reducers/             # Redux slices (one per feature)
  services/             # API call functions (called by thunks)
  store/
    store.js            # Redux store configuration
  utils/
    handleApiError.js   # Consistent error handling utility
```

## State Management (Redux Toolkit)
All global state is managed with Redux Toolkit. The store is configured in `src/store/store.js`.

Each feature has its own slice in `src/reducers/` (e.g., `authSlice.js`, `threadListSlice.js`).

- Use `useSelector` to read state and `useDispatch` to dispatch actions. Never import the store directly in components.
- For API calls, use `createAsyncThunk`. Each thunk calls a function from `src/services/`.
- Handle loading, success, and error states in `extraReducers` using the builder pattern:
  - `.addCase(thunk.pending, ...)` → set `loading: true`, clear `error`
  - `.addCase(thunk.fulfilled, ...)` → update state with payload, set `loading: false`
  - `.addCase(thunk.rejected, ...)` → set `loading: false`, store error from payload
- Never access `localStorage` directly in components; always use Redux actions (`loginUser`, `logout`, `setUser`).
- Use `handleApiError` from `src/utils/handleApiError.js` in thunk `catch` blocks for consistent error handling.

## API Layer
- All HTTP requests go through `src/api/axiosInstance.js` — do not use `fetch()`.
- All endpoint paths are defined in `src/config/apiConfig.js` — do not hardcode URLs in services or components.
- The backend returns data wrapped in a `data` property: `response.data.data`.

## Coding Conventions
- Functional components only — no class components.
- Follow the existing slice pattern in `src/reducers/currentThreadSlice.js` as the reference implementation.
- Follow the existing service pattern in `src/services/authService.js` for new service functions.
- Keep component logic minimal — business logic belongs in slices/services.
- Do not restructure the folder layout or rename existing files.
- Do not remove existing class names or CSS — only add or adjust styles.

## Running the Project
```bash
npm install      # Install dependencies
npm run dev      # Start dev server at http://localhost:5173
npm run build    # Production build
npm run lint     # Run ESLint
```
