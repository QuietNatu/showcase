# Smeargle (React)

> Smeargle, the Painter Pokémon. Colored fluids ooze from their tails, which they use to mark their territory and to express themselves.

A Single-page application in React

TODO: Add Gotcha for frameworks lacking proper testing tools

## 🤡 Gotchas

### Testing with server-side rendering frameworks

To me, one of the biggest indicators of the quality of a library or framework is the quality of the tests that are possible to do with it.
Unfortunately, it seems that nowadays most of the Javascript ecosystem is treating testing as a second class citizen or outright ignoring it, forcing developers
to create third party tools and documentation about testing.
Server-side rendering frameworks like **Next.js** and **Tanstack Start** are some of the biggest transgressors in this. They do not provide any kind of testing tools and since their code require special compilation steps it become quite hard, if not impossible, to create simple tests that do not require running a whole app or mocking most of the imports from those packages.
