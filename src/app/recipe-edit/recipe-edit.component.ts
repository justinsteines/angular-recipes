import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toast.service';
import { Recipe } from '../recipe.interface';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss'],
})
export class RecipeEditComponent implements OnInit {
  editing = true;
  recipe: Recipe = {} as Recipe;
  viewMode = 'list';
  ingredientsOrInstructions = 'ingredients';
  recipeForm: FormGroup = {} as FormGroup;
  formSubmitAttempt = false;

  constructor(
    private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.editing = this.router.url === '/recipe/create' ? false : true;
    this.viewMode = window.localStorage.getItem('recipeViewMode') || 'list';

    this.activatedRoute.params.subscribe((params) => {
      this.recipe = this.recipeService.getRecipeById(params.recipeId);
      if (this.editing && !this.recipe) {
        this.router.navigate(['/recipe', this.viewMode]);
      }
    });

    this.recipeForm = new FormGroup({
      _id: new FormControl(this.recipe?._id || null),
      name: new FormControl(this.recipe?.name || null, Validators.required),
      prepTime: new FormControl(this.recipe?.prepTime || null),
      cookTime: new FormControl(this.recipe?.cookTime || null),
      imageUrl: new FormControl(this.recipe?.imageUrl || null),
      isFavorite: new FormControl(this.recipe?.isFavorite || null),
      ingredients: this.loadIngredients(),
      instructions: this.loadInstructions(),
    });
  }

  toggleIngredientsOrInstructions(newValue: string): void {
    this.ingredientsOrInstructions = newValue;
  }

  loadIngredients(): FormArray {
    const controls = new FormArray([]);
    if (this.recipe && this.recipe.ingredients.length > 0) {
      this.recipe.ingredients.forEach((ingredient) => {
        controls.push(
          new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            amount: new FormControl(ingredient.amount),
          })
        );
      });
    } else {
      controls.push(
        new FormGroup({
          name: new FormControl(null, Validators.required),
          amount: new FormControl(null),
        })
      );
    }
    return controls;
  }

  loadInstructions(): FormArray {
    const controls = new FormArray([]);
    if (this.recipe && this.recipe.instructions.length > 0) {
      this.recipe.instructions.forEach((instruction) => {
        controls.push(new FormControl(instruction, Validators.required));
      });
    } else {
      controls.push(new FormControl(null, Validators.required));
    }
    return controls;
  }

  onAddIngredient(): void {
    const ingredientGroup = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null),
    });
    (this.recipeForm.get('ingredients') as FormArray).push(ingredientGroup);
  }

  get ingredientControls(): AbstractControl[] {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddInstruction(): void {
    const instructionControl = new FormControl(null, Validators.required);
    (this.recipeForm.get('instructions') as FormArray).push(instructionControl);
  }

  get instructionControls(): AbstractControl[] {
    return (this.recipeForm.get('instructions') as FormArray).controls;
  }

  onRemoveIngredient(i: number): void {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(i);
  }

  onRemoveInstruction(i: number): void {
    (this.recipeForm.get('instructions') as FormArray).removeAt(i);
  }

  onSubmit(): void {
    this.formSubmitAttempt = true;
    if (this.recipeForm.invalid) {
      this.toastService.showError(
        'Please check the form for errors. Review both the "Ingredients" and "Instructions" tabs.',
        { delay: 7000 }
      );
      return;
    }
    this.recipeService.saveRecipe(this.recipeForm.value);
    this.router.navigate(['/recipe', this.viewMode]);
  }
}
