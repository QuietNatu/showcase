# Rotom (Angular)

> Rotom, the Plasma Pokémon. With a body made of plasma, Rotom is able to permeate various kinds of electric devices, causing all sorts of problems.

## 🔗 Useful links

- Check differences between Angular versions - https://github.com/cexbrayat/angular-cli-diff

## 💡 Decisions

### Why create an adapter for [i18next](https://www.npmjs.com/package/i18next) instead of using [angular-i18next](https://www.npmjs.com/package/angular-i18next)?

Ideally, if a library already exists, it should be used. But in this case, angular-i18next does not provide all the features provided by i18next, namely type-checking translation keys.

## 🤡 Gotchas

### Important issues unresolved for more than 5 years

- https://github.com/angular/angular/issues/4059
- https://github.com/angular/angular/issues/7626
- https://github.com/angular/angular/issues/14842
- https://github.com/angular/components/issues/1432
- https://github.com/angular/angular/issues/14659
- https://github.com/angular/angular/issues/14545
- https://github.com/angular/angular/issues/13776
- https://github.com/angular/angular-cli/issues/11787
- https://github.com/angular/angular/issues/25963
- https://github.com/angular/angular/issues/12627
- https://github.com/angular/angular/issues/28731
- https://github.com/angular/components/issues/10113
- https://github.com/angular/angular/issues/19119

### Karma Jasmine HTML Reporter interferes with tests

The HTML produced by Karma Jasmine HTML Reporter is rendered on the same iframe where the tests are run. This makes it so that when searching for elements during a test, the HTML elements created by the reporter might also wrongly be selected. Testing library utils like `screen.getByText` or `userEvent.tab` will lead to wrong results because of this. This lowers the quality and confidence that the tests provide.

This behavior is configured by default by Angular. To solve this, Karma Jasmine HTML Reporter must be removed from the config.

### Not possible to fully wrap components

There are several reasons that make component wrappers hard to create in Angular. First is the fact that there is no input spreading, so each input has to be created manually. Next, to fully encapsulate a component, a component with an element selector must be created. The problem is that this creates a custom HTML element wrapping the wrapped component, which can be problematic in multiple ways. To avoid this, a component with an attribute selector, or a directive, must be created. The downside is that the wrapped component will be exposed, and it will not be possible to hide the inputs and outputs that it provides. Lastly, when using the previous approach, Angular does not provide a way to override events provided by the host component. This means that if the host component and the directive both output events with the same name, they will trigger more times than expected and will produce unexpected results.

Component wrapping is essential to create quality solutions, and these problems can lead to software with lower quality, thus, with more issues.

### Angular does not support importing components from uncompiled libraries

Unlike React and SolidJS, which allow you to simply import components without doing a build step first, Angular is quite inflexible regarding doing that.
A downside of this is that every time you make a change to a library, you have to build it again before using it.

As a workaround, you can use `tsconfig` paths to redirect imports to the library and import the components as if they were not part of a library.
The downside of this is that the library won't be added to `package.json`, unlike the rest of the libraries that are not part of the monorepo.
This makes it so that the apps that use the library need to know the directory of the library and makes it harder to adapt the app if the library is moved from the monorepo to a separate repository. Another downside is that imports will not auto-complete correctly.
