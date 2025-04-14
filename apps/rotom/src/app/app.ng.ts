import { Component, input, signal } from '@angular/core';

type Recipe = {
  id: string;
  name: string;
};

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

@Component({
  selector: 'app-root',
  imports: [RecipeList],
  templateUrl: './app.ng.html',
})
export class App {
  protected readonly recipes = signal<Recipe[]>([
    { id: 'rec_burger', name: 'Burger' },
    { id: 'rec_babaganoush', name: 'Babaganoush' },
  ]);
}
