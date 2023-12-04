# Rotom (Angular)

> Rotom, the Plasma Pokémon. With a body made of plasma, Rotom is able to permeate various kinds of electrics devices, causing all sorts of problems.

## 🤡 Gotchas

### Important issues unresolved for more than 5 years

- https://github.com/angular/angular/issues/4059
- https://github.com/angular/angular/issues/7626
- https://github.com/angular/angular/issues/10887

### Karma test runner window information interferes with tests

Testing library utils like screen.getByText or userEvent.tab will also interect with elements created by Karma that are not part of the test (like the test results information). This lowers the quality and confidence that the tests provide.

### Angular does not support importing components from uncompiled libraries

Unlike React and SolidJS that allow you to simply import components without doing a build step first, Angular is quite inflexible regarding doing that.
A downside of this is that everytime you make a change on a library you have to build it again before using.

As a workaround you can use tsconfig paths to redirect imports to the library, and import the components as if they were not part of a library.
The downside of this is that the library won't be added to package.json, unlike the rest of the libraries that are not part of the monorepo.
This makes it so that the apps that use the library need to know the directory of the library and makes it harder to adapt the app if the library is moved from the monorepo to a separate repository. Another downside is that imports will not auto-complete correctly.

### Angular does not support moduleResolution: "bundler"

Unline React and SolidJS, Angular only works if you use moduleResolution: "node". The downside of it is that you miss out on new features that are supported by typescript, namely using the "exports" field in package.json for a package to have sub exported folders (ex: "@natu/ui-angular" and "@natu/ui-angular/test")
