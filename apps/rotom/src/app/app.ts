import { ExampleCounter } from '@natu/ui-angular/components/example-counter';

import { Component, input, signal } from '@angular/core';

type Recipe = {
  id: string;
  name: string;
};

/** Renders a recipe list. */
@Component({
  selector: 'app-recipe-list',
  template: `
    @for (recipe of recipes(); track recipe.id) {
      <article>{{ recipe.name }}</article>
    } @empty {
      <p>No recipes found</p>
    }
  `,
})
export class RecipeList {
  readonly recipes = input.required<Recipe[]>();
}

/** Renders the whole app. */
@Component({
  selector: 'app-root',
  imports: [RecipeList, ExampleCounter],
  templateUrl: './app.html',
})
export class App {
  protected readonly recipes = signal<Recipe[]>([
    { id: 'rec_burger', name: 'Burger' },
    { id: 'rec_babaganoush', name: 'Babaganoush' },
  ]);
}
