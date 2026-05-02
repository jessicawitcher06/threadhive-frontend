# Week 5 Implementation Plan - ThreadHive Frontend

This plan follows the assignment sequence and separates manual implementation (Part 1) from AI-assisted development (Part 2).

## 0. Project Setup
- [x] Extract the assignment starter code into this folder.
- [x] Initialize git repository (`git init`) if not already initialized.
- [x] Install dependencies (`npm install`).
- [x] Run app (`npm run dev`) and verify `http://localhost:5173` loads.
- [x] Commit: `chore: initialize starter project`

## 1. Part 1 (Manual): Login Component
- [x] Implement `email` and `password` state using `useState` in the Login page.
- [x] Build controlled form fields for email and password.
- [x] Add submit handler to:
  - [x] prevent default form behavior
  - [x] log email/password to console
  - [x] show success alert
- [x] Verify form input and submit behavior in browser.
- [x] Commit: `feat: implement manual login form`

## 2. Part 1 (Manual): Header and Footer
- [x] Create `Header` component in `components/Header/Header.jsx`.
- [x] Accept `onNavigate` callback prop from `App.jsx`.
- [x] Add temporary `isAuthenticated = false` logic:
  - [x] show Login + Register when false
  - [x] show Logout when true
- [x] Wire button navigation:
  - [x] Login -> `onNavigate('login')`
  - [x] Register -> `onNavigate('register')`
  - [x] Logout -> `onNavigate('login')`
- [x] Create `Footer` component in `components/Footer/Footer.jsx` with current year copyright.
- [x] Verify Header button behavior.
- [x] Commit: `feat: add header and footer components`

## 3. Part 1 (Manual): App Conditional Rendering
- [x] In `App.jsx`, create `currentPage` state with `useState`.
- [x] Render `Header` and pass `setCurrentPage` via `onNavigate`.
- [x] Conditionally render pages:
  - [x] `login` -> `<Login />`
  - [x] `register` -> `<Register />`
- [x] Render `Footer` at the bottom of layout.
- [x] Verify navigation between Login and Register.
- [x] Commit: `feat: wire app navigation and conditional rendering`

## 4. Part 2 (AI-Assisted): Copilot Instructions
- [x] Generate `AGENTS.md` (equivalent to `/init` output).
- [x] Review and keep React/frontend conventions (functional components, styling/state conventions).
- [ ] Commit: `chore: add frontend copilot instructions`

## 5. Part 2 (AI-Assisted): Reset Password Page
- [ ] Generate `pages/Auth/ResetPassword.jsx` via Copilot Agent prompt.
- [ ] Ensure controlled form fields exist:
  - [ ] email
  - [ ] old password
  - [ ] new password
  - [ ] confirm password
- [ ] Add `onResetPassword` callback prop support.
- [ ] Validate password match on submit:
  - [ ] mismatch -> show inline error message
  - [ ] match -> call callback and show success message
- [ ] Add Header navigation entry for Reset Password.
- [ ] Add `App.jsx` conditional rendering for reset password page.
- [ ] Test mismatch and success flows in browser.
- [ ] Commit: `feat: add reset password page and navigation`

## 6. Part 2 (AI-Assisted): Multimodal Styling
- [ ] Attach `resources/login-screenshot.png` in Agent Mode and prompt layout-based redesign of Login page.
- [ ] Add an Unsplash placeholder image into `resources/` and use it in Login layout.
- [ ] Keep layout inspired by screenshot; do not clone exact colors/typography.
- [ ] Adapt changes to existing CSS Modules structure.
- [ ] Follow-up multimodal prompt: move labels into placeholders while retaining styling intent.
- [ ] Verify desktop and mobile layout behavior.
- [ ] Commit: `style: redesign login page from visual reference`

## 7. Part 2 (AI-Assisted): Testing Agent + Unit Tests
- [ ] Create custom agent via:
  - `/create-agent Create an agent called 'react-testing-agent' that creates unit tests for React components. Use React Testing Library and Vitest. Keep tests in top-level tests/ directory. Keep agent workspace scoped.`
- [ ] Verify agent file at `.github/agents/react-testing-agent.agent.md`.
- [ ] Generate Login component unit tests for:
  - [ ] render test (email/password fields present)
  - [ ] input capture test (controlled values update)
  - [ ] successful submit test (submits correct data)
- [ ] Run test suite (`npm run test`).
- [ ] If failing, iterate using Copilot with error output and adjust tests to component behavior.
- [ ] Optional: generate tests for Register and Reset Password.
- [ ] Commit: `test: add auth component unit tests`

## 8. Final Validation Checklist
- [ ] Run app and manually verify navigation and form flows.
- [ ] Run tests and confirm passing results.
- [ ] Ensure meaningful commit history for each milestone.
- [ ] Push final code and submit.

## Recommended Commit Order
1. `chore: initialize starter project`
2. `feat: implement manual login form`
3. `feat: add header and footer components`
4. `feat: wire app navigation and conditional rendering`
5. `chore: add frontend copilot instructions`
6. `feat: add reset password page and navigation`
7. `style: redesign login page from visual reference`
8. `test: add auth component unit tests`
9. `chore: final validation before submission`
