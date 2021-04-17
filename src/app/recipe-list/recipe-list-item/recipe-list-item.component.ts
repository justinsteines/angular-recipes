import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../../recipe.interface';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-list-item',
  templateUrl: './recipe-list-item.component.html',
  styleUrls: ['./recipe-list-item.component.scss'],
})
export class RecipeListItemComponent implements OnInit, OnDestroy {
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
