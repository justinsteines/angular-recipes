import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../../recipe.interface';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-grid-item',
  templateUrl: './recipe-grid-item.component.html',
  styleUrls: ['./recipe-grid-item.component.scss'],
})
export class RecipeGridItemComponent implements OnInit, OnDestroy {
  @Input() recipe: Recipe = {} as Recipe;
  recipeIsFavorite = false;
  recipeIsFavoriteSubscription: Subscription = {} as Subscription;

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeIsFavorite = this.recipe.isFavorite;
    this.recipeIsFavoriteSubscription = this.recipeService.recipeIsFavoriteChanged.subscribe(
      () => {
        this.recipeIsFavorite = this.recipeService.getRecipeById(
          this.recipe._id
        ).isFavorite;
      }
    );
  }

  onToggleFavoriteRecipeById(event: Event, recipeId: string): void {
    this.recipeService.toggleFavoriteRecipeById(recipeId);
    event.stopPropagation();
  }

  ngOnDestroy(): void {
    this.recipeIsFavoriteSubscription.unsubscribe();
  }
}
