# AGENTS.md

## Project Context
ThreadHive frontend is a React + Vite app. Keep components simple, readable, and beginner-friendly for coursework.

## React Conventions
- Use functional components only.
- Prefer named function components and explicit exports at file end.
- Keep one primary component per file.
- Use useState for local form state and controlled inputs.
- Keep event handlers small and descriptive (for example: handleSubmit, handleChange).
- Avoid class components and lifecycle methods.

## State and Data Flow
- Keep state in the nearest common parent when multiple children need to coordinate.
- Pass callbacks through props for child-to-parent communication.
- Use conditional rendering in App-level components for page/view switching.
- Keep temporary auth logic explicit with clearly labeled placeholders.

## Form Patterns
- Build forms as controlled components.
- Always prevent default behavior in submit handlers.
- Validate user input before calling parent callbacks.
- Display validation feedback in the UI (error/success messages) using conditional rendering.

## Styling Conventions
- Follow existing file-local CSS structure and naming already in this repo.
- Keep styles scoped by component folder when possible.
- Prefer clear class names tied to layout intent.
- Avoid unnecessary style rewrites when making functional changes.

## Testing Conventions
- Use Vitest + React Testing Library.
- Place tests under the top-level tests directory.
- Test user-visible behavior (rendering, typing, submit outcomes), not implementation internals.
- Use accessible queries first (getByRole, getByLabelText, getByText).

## Code Quality
- Keep changes minimal and focused on assignment requirements.
- Do not introduce dependencies unless required.
- Preserve existing project structure and naming conventions.
- Add short comments only when logic is not self-evident.
