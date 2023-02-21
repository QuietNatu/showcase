# Showcase

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/QuietNatu/showcase/ci.yml?style=for-the-badge)](https://github.com/QuietNatu/showcase/actions/workflows/ci.yml) [![GitHub last commit](https://img.shields.io/github/last-commit/QuietNatu/showcase?style=for-the-badge)](https://github.com/QuietNatu/showcase/branches/all)

A project to practice and showcase what I have learned.

## ⚡️ Quick start

First of all, [download](https://nodejs.org/en/) and install the **Node** version specified on this project's package.json.

Run `npm ci` to install all dependencies and then...

- To start the app in development mode run `npm run dev`.
- To start the app in production mode build it with `npm run build` and then serve it with `npm run preview`.
- To run Storybook use `npm run storybook`.
- To run unit tests use `npm run test`.
- To run end-to-end tests use `npm run e2e`.

## 💻 Supported browsers

Run `npx browserslist` to see the list of supported browsers.

## 📚 Recommended VS Code extensions

A list of recommended extensions is provided. When this project is opened **VS Code** will prompt to install the recommended extensions.

## 💭 Thoughts

### State Management

In the past you would use state management solutions, like **Redux** or **Zustand**, to manage your application state. The application state had both data owned by the client (UI state, route state, etc) and data owned by the server (data from the database).

Now we have specialized solutions like, **Tanstack-Query** to manage server state. This means that solutions like **Redux** or **Zustand** are only responsible for managing client state. Since client state tends to be scarce and not update that often you can probably use **React Hooks + React Context** to manage the client state. Only if you have a lot of client state / state that updates frequenty / complex state should you bother to use a proper client state management solution.

To me the best approach to use right now is:

- **Tanstack-Query** to manage server state
- **React Hooks + React Context** for simple client state management
- **Redux**, **Zustand**, etc for a more scalable client state management
- **XState** if you need to constraint/forbid some state changes and you are interested in transitions (ex: Multi-step forms, complex flows of actions)
