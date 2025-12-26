# Smeargle (React)

> Smeargle, the Painter Pokémon. Colored fluids ooze from their tails, which they use to mark their territory and to express themselves.

A Single-page application in React

TODO: Add Gotcha for frameworks lacking proper testing tools

## 🤡 Gotchas

### Testing with server-side rendering (SSR) frameworks

To me, one of the strongest indicators of the quality of a library or framework is how well it integrates with testing tools and how easy it is to create quality tests for it.
Unfortunately, much of today’s JavaScript ecosystem either treats testing as a second-class citizen, or ignores it entirely, forcing developers to rely on community-maintained tools and documentation just to test their code.

Server-side rendering frameworks such as **Next.js** and **TanStack Start** are among the most notable offenders. Not only do they not provide testing utils or adapters, but, since SSR features typically require special compilation steps, it becomes increasingly difficult, if not impossible, to write simple tests without either running the entire application or extensively mocking these framework exports.

When the application must be run in order to test it, tests cease to be simple unit or integration tests and instead begin to resemble system tests. Conversely, the more dependencies are mocked, the less the tests reflect real application behavior. This also increases reliance on implementation details, leading to flaky tests that tend to break during refactors.

To work around these issues, most application code should be isolated from SSR-specific features. This allows the majority of the codebase to be tested using standard approaches, while also encouraging better separation of concerns.
For code that depends on SSR features, system tests are needed. In these cases, tools such as **Playwright** and **MSW** can be used to isolate the browser and server environments from external dependencies. This way, client side and server side functionality can be tested, and the only mocks needed are for external network requests.
