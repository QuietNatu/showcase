# Showcase

[![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/QuietNatu/showcase/ci.yml?style=for-the-badge)](https://github.com/QuietNatu/showcase/actions/workflows/ci.yml) [![GitHub last commit](https://img.shields.io/github/last-commit/QuietNatu/showcase?style=for-the-badge)](https://github.com/QuietNatu/showcase/branches/all)

A project to practice and showcase what I have learned.

- [Showcase](#showcase)
  - [⚡️ Quick start](#️-quick-start)
    - [Development Container](#development-container)
    - [Local Setup](#local-setup)
    - [Common Setup](#common-setup)
    - [Commands](#commands)
  - [💻 Supported browsers](#-supported-browsers)
  - [📝 Standards](#-standards)
  - [🖋️ VS Code](#️-vs-code)
  - [🧱 Project structure](#-project-structure)
  - [🔧 Technical decisions](#-technical-decisions)
    - [SPA runtime configuration](#spa-runtime-configuration)
  - [💭 Thoughts](#-thoughts)
    - [Component libraries](#component-libraries)
    - [Visual Regression Tests (VRT)](#visual-regression-tests-vrt)
    - [Backend Mocking](#backend-mocking)

## ⚡️ Quick start

To setup the project you can either use the provided [Development Container](https://containers.dev/) _(recommended)_ or do a local setup.

### Development Container

Instead of locally cloning and setting up the project, it is recommended to clone a repository into a Devcontainer volume. This is preferred because it allows everyone to develop in a consistent environment, minimizing time wasted setting up the project and troubleshooting issues related to differences in the machine used. To set it up you have to:

- [Download](https://www.docker.com/) and install **Docker**.
- [Clone the repository in a Container volume](https://code.visualstudio.com/docs/devcontainers/containers#_quick-start-open-a-git-repository-or-github-pr-in-an-isolated-container-volume).
- Once container finishes setting up, all the dependencies will already be installed and the project is ready to be used.

### Local Setup

If for some reason you cannot use Docker or prefer to locally set it up you have to:

- [Download](https://nodejs.org/en/) and install the **Node** version specified on this project's **package.json**.
- [Download](https://pnpm.io/) and install the **PNPM** version specified on this project's **package.json**.
- [Download](https://git-lfs.com/) and install **Git LFS** _(Git for windows already includes Git LFS)_.
- Run `pnpm install` to install all dependencies.

### Common Setup

These steps are required when using any of the above approaches:

- For Angular apps, create a local environment-development.ts file in the environments folder, similar to the other environment files.

### Commands

- To start the app in development mode run `pnpm dev`.
- To start the app in production mode build it with `pnpm build` and then serve it with `pnpm preview`.
- To analyse the production bundle use `pnpm analyse`.
- To run Storybook use `pnpm storybook`.
- To run all code linters use `pnpm lint`.
- To run unit tests use `pnpm test`.
- To run visual regression tests use `pnpm vrt`.
- To run end-to-end tests use `pnpm e2e`.
- To interact with browsers opened inside a Devcontainer connect to the Container volume by opening a browser in http://localhost:5900/ and using the password "**vscode**"

## 💻 Supported browsers

Run `pnpm dlx browserslist` inside each app folder to see the list of supported browsers.

## 📝 Standards

For accessibility, this project tries to conform with **WCAG Level AAA**.

## 🖋️ VS Code

For better monorepo organization, a custom workspace is provided at `.vscode/showcase.code-workspace`.

A list of recommended extensions is provided. When this project is opened, **VS Code** will prompt to install the recommended extensions.

## 🧱 Project structure

This project is a **monorepo**. It contains **apps** that can be deployed and **packages** used by those apps.

Inside this monorepo there are 2 different types of packages and apps:

- **React** packages along with an app named **Smeargle**.
- **Angular** packages along with an app named **Rotom**.

The main objective of this is to try to solve the same issues using different libraries/frameworks and find out what kind of problems they have and the different solutions they provide.

## 🔧 Technical decisions

### SPA runtime configuration

Typically, configuration files or environment variables, are used to modify the behaviour of an app. In the case of Single-page applications, all environment variables must be provided before the application is bundled and configuration files must be provided before the container for the app is built. To change these variables/files the application would have to be bundled/built again.

To avoid rebundling or rebuilding, the apps in this repository use runtime configuration files named `config.js`.
These files are then imported via a script present in the index.html of each app, before the app itself renders.
These files can then be replaced, for example with [Kubernetes ConfigMaps](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/), and thus allowing for an app to be configured without recreating the container image.

## 💭 Thoughts

### Component libraries

Traditionally, component libraries, like **Ant Design**, **Mantine** or **PrimeNG**, provide components with everything included out of the box (HTML, CSS and Javascript). This approach is quite useful when you have to build applications that don't rely too much on design or flexibility, like for quick prototyping or for simple back-office dashboards. The problem with this approach is that when used as building blocks for an application with specific design needs, these components lack the flexibility to build truly custom components. Most often, this is because they encapsulate both the presentation layer and the logic layer of a given component. Another problem with this kind of libraries is that by owning the presentation layer, the options and variations that the component has to support grow exponentially and most of the times these libraries don't fully support all the options that are needed. Even more of a problem is that by having so many options and variations, it becomes hard to create fully accessible components.

Currently the best way to increase the flexibility of a reusable component is to focus solely on the logic side of it and leave the presentation side for the library users to create. This pattern is called **Headless UI components**. This allows developers to create custom components that meet their design requirements without having to spend time working on the logic side of them. Another caracteristic of these libraries is that they tend to focus more on creating accessible components. By being much more flexible, this pattern also helps creating applications that are future-proof.

To me, libraries that implement **Headless UI components** like **Radix UI** and **React Aria** are the best way to create custom components without having to reinvent the wheel.

### Visual Regression Tests (VRT)

These kinds of tests have always been problematic due to how flaky they can be and how much consideration is required when setting them up.

These tests can pass or fail depending on:

- The **browser** used
- The **operative system** used
- The **graphics card** used

Slight pixel differences in the positioning of the elements, the way a operative system renders fonts and anti-aliasing are some of the most common causes of false positives regarding visual regression testing. The outputs of these tests are also problematic since they are typically images and storing images in a repository can waste a lot of storage.

To mitigate these issues visual regression tests should always be ran in the same environment and in the same conditions and as such:

- **Containers** should be used to guarantee consistent conditions
- **Browser flags** should be used to prevent anti-aliasing from affecting the test results
- **Git LFS** should be used to store the results of these tests

### Backend Mocking

Backend mocks are useful for both testing and local development. For testing they can be used to do integration tests. For local development these mocks serve as a way for the frontend to not rely on the backend when developing. So when doing backend mocks, they should be done in a way that allows for both testing and local development.

Right now I think that the best approach to take is to mock the network layer and to provide an in-memory database with mock data generated by a random data generator. A good way to achieve this would be to use **Mock Service Worker (MSW)** to mock the requests, **@mswjs/data** to provide the in-memory database and **Chance.js** to generate the data used in that in-memory database.

For local development the provided database would already be seeded with data, while for testing the database would be empty, should be populated with the data required to perform the test and should be cleared after each test.
