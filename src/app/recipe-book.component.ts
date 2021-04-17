import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from './recipe.interface';
import { RecipeService } from './recipe.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.scss'],
})
export class RecipeBookComponent implements OnInit, OnDestroy {
  router: Router;
  recipes: Recipe[] = [];
  recipesChangedSubscription: Subscription = {} as Subscription;

  constructor(
    router: Router,
    private recipeService: RecipeService,
    private http: HttpClient
  ) {
    this.router = router;
  }

  ngOnInit(): void {
    if (this.router.url === '/recipe') {
      this.router.navigate([
        '/recipe',
        window.localStorage.getItem('recipeViewMode') || 'list',
      ]);
    }
    // If user visits /recipe, redirect to /recipe/list or /recipe/grid
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.router.url === '/recipe') {
        this.router.navigate([
          '/recipe',
          window.localStorage.getItem('recipeViewMode') || 'list',
        ]);
      }
    });
    this.recipes = this.recipeService.getRecipes();
    this.recipesChangedSubscription = this.recipeService.recipeChanged.subscribe(
      () => {
        this.recipes = this.recipeService.getRecipes();
      }
    );
  }

  onViewModeSelect(viewMode: string): void {
    window.localStorage.setItem('recipeViewMode', viewMode);
  }

  ngOnDestroy(): void {
    this.recipesChangedSubscription.unsubscribe();
  }
}
