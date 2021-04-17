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
    data: {
      title: 'Recipe Book',
    },
    children: [
      {
        path: 'list',
        component: RecipeListComponent,
        data: {
          title: 'Recipe Book',
        },
      },
      {
        path: 'grid',
        component: RecipeGridComponent,
        data: {
          title: 'Recipe Book',
        },
      },
      {
        path: 'create',
        component: RecipeEditComponent,
        data: {
          title: 'Recipe Book',
        },
      },
      {
        path: ':recipeId',
        component: RecipeViewComponent,
        data: {
          title: 'Recipe Book',
        },
      },
      {
        path: ':recipeId/edit',
        component: RecipeEditComponent,
        data: {
          title: 'Recipe Book',
        },
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
