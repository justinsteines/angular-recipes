import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipeBookComponent } from './recipe-book.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeGridComponent } from './recipe-grid/recipe-grid.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeViewComponent } from './recipe-view/recipe-view.component';

const routes: Routes = [
  {
    path: 'recipe',
    component: RecipeBookComponent,
    children: [
      {
        path: 'list',
        component: RecipeListComponent,
      },
      {
        path: 'grid',
        component: RecipeGridComponent,
      },
      {
        path: 'create',
        component: RecipeEditComponent,
      },
      {
        path: ':recipeId',
        component: RecipeViewComponent,
      },
      {
        path: ':recipeId/edit',
        component: RecipeEditComponent,
      },
    ],
  },
  { path: '**', redirectTo: '/recipe' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
