# Showcase

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/QuietNatu/showcase/ci.yml?style=for-the-badge)](https://github.com/QuietNatu/showcase/actions/workflows/ci.yml) [![GitHub last commit](https://img.shields.io/github/last-commit/QuietNatu/showcase?style=for-the-badge)](https://github.com/QuietNatu/showcase/branches/all)

A project to practice and showcase what I have learned.

- [Showcase](#showcase)
  - [⚡️ Quick start](#️-quick-start)
    - [Commands](#commands)
  - [💻 Supported browsers](#-supported-browsers)
  - [📝 Standards](#-standards)
  - [🖋️ VS Code](#️-vs-code)
  - [🧱 Project structure](#-project-structure)
  - [🔧 Technical decisions](#-technical-decisions)
    - [SPA runtime configuration](#spa-runtime-configuration)
    - [Library exports](#library-exports)
  - [💭 Thoughts](#-thoughts)
    - [Component libraries](#component-libraries)
    - [Visual Regression Tests (VRT)](#visual-regression-tests-vrt)
    - [Backend Mocking](#backend-mocking)

## ⚡️ Quick start

To set up the project you have to:

- [Download](https://nodejs.org/en/) and install the **Node** version specified in this project's **package.json**.
- [Download](https://pnpm.io/) and install the **PNPM** version specified in this project's **package.json**.
- [Download](https://git-lfs.com/) and install **Git LFS** _(Git for Windows already includes Git LFS)_.
- Run `pnpm install` to install all dependencies.

### Commands

- To start the app in development mode, run `pnpm dev`.
- To start the app in production mode, build it with `pnpm build` and then serve it with `pnpm preview`.
- To analyze the production bundle, use `pnpm analyse`.
- To run Storybook, use `pnpm storybook`.
- To run all code linters, use `pnpm lint`.
- To run unit tests, use `pnpm test`.
- To run visual regression tests, use `pnpm vrt`.
- To run end-to-end tests, use `pnpm e2e`.
- To inpect eslint configuration, use `pnpm dlx @eslint/config-inspector@latest` in the same directory where `eslint.config.js` is located.
- To make sure code builds on the pipeline, run, in a bash compatible terminal, `sh scripts/preflight-check`.
- To validate the Renovate configuration, run: `pnpm renovate:validate`.

## 💻 Supported browsers

Run `pnpm dlx browserslist` inside each app folder to see the list of supported browsers.

## 📝 Standards

For accessibility, this project tries to conform to **WCAG 2.2 Level AAA**.

## 🖋️ VS Code

For better monorepo organization, a custom workspace is provided at `.vscode/showcase.code-workspace`.

A list of recommended extensions is provided. When this project is opened, **VS Code** will prompt you to install the recommended extensions.

## 🧱 Project structure

This project is a **monorepo**. It contains **apps** that can be deployed and **packages** used by those apps.

Inside this monorepo, there are 2 different types of packages and apps:

- **React** packages along with an app named **Smeargle**.
- **Angular** packages along with an app named **Rotom**.

The main objective of this is to try to solve the same issues using different libraries/frameworks and find out what kind of problems they have and the different solutions they provide.

## 🔧 Technical decisions

### SPA runtime configuration

Typically, configuration files or environment variables are used to modify the behavior of an app. In the case of Single-page applications, all environment variables must be provided before the application is bundled, and configuration files must be provided before the container for the app is built. To change these variables/files, the application would have to be bundled/built again.

To avoid rebundling or rebuilding, the SPAs in this repository use runtime configuration files named `config.js`.
These files are then imported via a script present in the `index.html` of each app, before the app itself renders.
These files can then be replaced, for example, with [Kubernetes ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/), thus allowing for an app to be configured without recreating the container image.

### Library exports

In the past, it was common to provide all exports of a library through a single index file that acted as an entry point for the library. However, this approach was not ideal because when a file imported a library, it would import all the modules provided by that library's entry point. This forced bundlers to analyze those modules and tree-shake any unused code. Without proper tree-shaking, bundlers would produce unnecessarily large bundles containing unused code.

To address this issue, large libraries should avoid exporting all modules through a single main entry point. Instead, they should provide multiple entry points for their exports. This can be achieved by specifying the package exports in the `package.json` file as follows:

```json
// package.json
"exports": {
  // Main entrypoint (import "my-lib")
  ".": {
    "default": "./src/lib/index.js"
  },
  // Secondary entrypoint (import "my-lib/utils")
  "./utils": {
    "default": "./src/lib/utils/index.js"
  },
  // Secondary entrypoint per component (import "my-lib/components/button" / import "my-lib/components/table")
  "./components/*": {
    "default": "./src/lib/components/*/index.js"
  },
},

```

## 💭 Thoughts

### Component libraries

Traditionally, component libraries, like **Ant Design**, **Mantine**, or **PrimeNG**, provide components with everything included out of the box (HTML, CSS, and JavaScript). This approach is quite useful when you have to build applications that don't rely too much on design or flexibility, like for quick prototyping or for simple back-office dashboards. The problem with this approach is that when used as building blocks for an application with specific design needs, these components lack the flexibility to build truly custom components. Most often, this is because they encapsulate both the presentation layer and the logic layer of a given component. Another problem with these kinds of libraries is that by owning the presentation layer, the options and variations that the component has to support grow exponentially, and most of the time these libraries don't fully support all the options that are needed. Even more of a problem is that by having so many options and variations, it becomes hard to create fully accessible components.

Currently, the best way to increase the flexibility of a reusable component is to focus solely on the logic side of it and leave the presentation side for the library users to create. This pattern is called **Headless UI components**. This allows developers to create custom components that meet their design requirements without having to spend time working on the logic side of them. Another characteristic of these libraries is that they tend to focus more on creating accessible components. By being much more flexible, this pattern also helps create applications that are future-proof.

To me, libraries that implement **Headless UI components** like **Radix UI** and **React Aria** are the best way to create custom components without having to reinvent the wheel.

### Visual Regression Tests (VRT)

These kinds of tests have always been problematic due to how flaky they can be and how much consideration is required when setting them up.

These tests can pass or fail depending on:

- The **browser** used
- The **operating system** used
- The **graphics card** used

Slight pixel differences in the positioning of the elements, the way an operating system renders fonts, and anti-aliasing are some of the most common causes of false positives regarding visual regression testing. The outputs of these tests are also problematic since they are typically images, and storing images in a repository can waste a lot of storage.

To mitigate these issues, visual regression tests should always be run in the same environment and under the same conditions, and as such:

- **Containers** should be used to guarantee consistent conditions.
- **Browser flags** should be used to prevent anti-aliasing from affecting the test results.
- **Git LFS** should be used to store the results of these tests.

### Backend Mocking

Backend mocks are useful for both testing and local development. For testing, they can be used to do integration tests. For local development, these mocks serve as a way for the frontend to not rely on the backend when developing. So when doing backend mocks, they should be done in a way that allows for both testing and local development.

Right now, I think that the best approach to take is to mock the network layer and to provide an in-memory database with mock data generated by a random data generator. A good way to achieve this would be to use **Mock Service Worker (MSW)** to mock the requests, **@mswjs/data** to provide the in-memory database, and **Chance.js** to generate the data used in that in-memory database.

For local development, the provided database would already be seeded with data, while for testing, the database would be empty, should be populated with the data required to perform the test, and should be cleared after each test.
