import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.interface';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements OnInit, OnDestroy {
  recipe: Recipe = {} as Recipe;
  viewMode = 'list';
  recipeIsFavorite = false;
  recipeIsFavoriteSubscription: Subscription = {} as Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipeById(params.recipeId);
      if (!this.recipe) {
        this.router.navigate(['/recipe', this.viewMode]);
      }
    });
    this.viewMode = window.localStorage.getItem('recipeViewMode') || 'list';
    this.recipeIsFavorite = this.recipe?.isFavorite || false;
    this.recipeIsFavoriteSubscription = this.recipeService.recipeIsFavoriteChanged.subscribe(
      () => {
        this.recipeIsFavorite =
          this.recipeService.getRecipeById(this.recipe._id)?.isFavorite ||
          false;
      }
    );
  }

  onRecipeDelete(content: any, recipeId: string): void {
    this.modalService.open(content).result.then((result) => {
      if (result === 'confirm_delete') {
        this.recipeService.deleteRecipeById(recipeId);
        this.router.navigate([
          '/recipe',
          window.localStorage.getItem('recipeViewMode') || 'list',
        ]);
      }
    });
  }

  onToggleFavoriteRecipeById(recipeId: string): void {
    this.recipeService.toggleFavoriteRecipeById(recipeId);
  }

  ngOnDestroy(): void {
    this.recipeIsFavoriteSubscription.unsubscribe();
  }
}
