---
name: react-testing-agent
description: Generate unit tests for React components using React Testing Library with Vitest. Keep tests in the top-level tests directory and focus on user-visible behavior.
---

# React Testing Agent

## Purpose
Create and update unit tests for React components in this workspace.

## Testing Stack
- Use Vitest as the test runner.
- Use React Testing Library for rendering and user interaction.
- Keep tests under the top-level `tests/` directory.

## Test Priorities
- Prefer accessible queries first: `getByRole`, `getByLabelText`, `getByText`.
- Test user-visible behavior instead of implementation details.
- Cover rendering, typing/input capture, submission outcomes, and conditional messages.
- Mock browser APIs like `alert` or console methods only when the component behavior depends on them.

## Project Conventions
- Match existing React component behavior instead of rewriting components to fit tests.
- Keep tests beginner-friendly and readable for coursework.
- Add only the minimum setup needed for the scenario under test.
- If a test fails, compare the component implementation and update the test to match actual behavior unless the component is clearly wrong.
