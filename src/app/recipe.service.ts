import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { Subject } from 'rxjs';
import { ToastService } from './toast.service';
import { Recipe } from './recipe.interface';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  private recipes: Recipe[] = [
    {
      _id: 'egaalye325msfj2zknxt1i',
      name: 'Vegetable Stir Fry',
      prepTime: '20 minutes',
      cookTime: '25-30 minutes',
      isFavorite: false,
      imageUrl:
        'https://p1.pxfuel.com/preview/7/627/691/stir-fry-cooking-healthy-dish.jpg',
      ingredients: [
        { name: 'basmati rice', amount: '1/2 cup' },
        { name: 'broccoli', amount: '1 crown' },
        { name: 'cashews, roasted unsalted', amount: '1/2 cup' },
        { name: 'garlic', amount: '1 clove' },
        { name: 'ginger root', amount: '1 (1 inch) piece' },
        { name: 'red bell pepper', amount: '1' },
        { name: 'sugar snap peas', amount: '1 (8 oz) pkg' },
        { name: 'cornstarch', amount: '' },
        { name: 'crushed red pepper', amount: '' },
        { name: 'salt', amount: '' },
        { name: 'soy sauce', amount: '' },
        { name: 'virgin coconut oil', amount: '' },
      ],
      instructions: [
        'Using a strainer or colander, rinse the rice under cold, running water, then drain and transfer to a small saucepan. Season the rice with salt and add water; bring the mixture to a boil over high heat.',
        'Wash broccoli, bell pepper, and sugar snap peas.',
        'Once the liquid comes to a boil, stir the mixture, cover the saucepan, and reduce the heat to low. Cook the rice until the liquid is fully absorbed, 15 to 18 minutes. Once done, remove the rice from the heat and let it stand, still covered, for 5 minutes.',
        'Separate broccoli into bite-sized florets, cut stem into smaller pieces, and transfer to a large bowl. Seed, medium dice, and add bell pepper to bowl. Halve peas and add to bowl.',
        'Heat a skillet over medium-high heat.',
        'Peel and mince garlic. Peel and mince or grate ginger.',
        'In a small bowl, prepare sauce by whisking together soy sauce and cornstarch.',
        'Coat bottom of skillet with oil. Add garlic, ginger, and crushed red bell pepper. Cook until fragrant, 15-30 seconds.',
        'Add all the vegetables from the bowl to skillet. Stir fry until tender-crisp, 4-5 minutes.',
        'Add sauce and cashews to skillet. Stir fry until vegetables and cashews are well coated with sauce, 1-2 minutes.',
        'Uncover the rice and fluff with a fork.',
        'Place rice in a bowl and top with stir fry. Enjoy!',
      ],
    },
    {
      _id: 'lc7tnuxv26dheaxpsl6ym8',
      name: 'Chocolate Cupcakes',
      prepTime: '10 minutes',
      cookTime: '18-22 minutes',
      isFavorite: true,
      imageUrl:
        'https://images.unsplash.com/photo-1616631124190-fa90afc46fa7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80',
      ingredients: [
        { name: 'granulated sugar', amount: '2 cups' },
        { name: 'all-purpose flour', amount: '1 3/4 cup + 2 Tbsp' },
        { name: 'natural unsweetened cocoa powder', amount: '3/4 cup' },
        { name: 'baking powder', amount: '2 tsp' },
        { name: 'baking soda', amount: '1 1/2 tsp' },
        { name: 'salt', amount: '1 tsp' },
        { name: 'canola oil', amount: '2/3 cup' },
        { name: 'milk', amount: '1 cup' },
        { name: 'large eggs', amount: '2' },
        { name: 'vanilla extract', amount: '2 tsp' },
        { name: 'hot water', amount: '1 cup' },
      ],
      instructions: [
        'Preheat oven to 350°F.',
        'Line muffin tin with cupcake liners (or lightly grease and flour).',
        'In large bowl, whisk together sugar, flour, cocoa powder, baking powder, baking soda, and salt.',
        'Stir in canola oil and milk, stirring until combined.',
        'Add eggs, one at a time, stirring after each addition.',
        'Stir in vanilla extract.',
        'Add hot water and stir until the mixture is evenly combined. It will be a thin batter.',
        'Fill prepared muffin tin cavities just over 2/3 of the way full and bake at 350°F for 18-22 minutes.',
        'Allow cupcakes to cool completely before frosting.',
      ],
    },
    {
      _id: 'gxixn5bdwppl9l0x9swwm',
      name: 'Pizza Casserole',
      prepTime: '25 minutes',
      cookTime: '30 minutes',
      isFavorite: true,
      imageUrl:
        'https://p1.pxfuel.com/preview/457/602/392/cheese-cherry-tomatoes-homemade-italian.jpg',
      ingredients: [
        { name: 'uncooked egg noodles', amount: '2 cups' },
        { name: 'lean ground beef', amount: '1/2 lb' },
        { name: 'onion', amount: '' },
        { name: 'pepper', amount: '' },
        { name: 'sliced pepperoni', amount: '' },
        { name: 'pizza sauce', amount: '16 oz' },
        { name: 'milk', amount: '4 tablespoons' },
        { name: 'shredded mozzarella cheese', amount: '' },
      ],
      instructions: [
        'Cook noodles.',
        'Preheat oven to 350°F.',
        'Brown the ground beef with onion and pepper. Stir in noodles, pepperoni, pizza sauce, and milk. Mix well. Pour mixture into a 2-quart casserole dish.',
        'Bake at 350°F for 20 min, top with cheese, then bake for 5 to 10 more minutes.',
      ],
    },
  ];
  recipeChanged = new Subject<void>();
  recipeIsFavoriteChanged = new Subject<void>();

  constructor(private toastService: ToastService) {}

  getRecipes(): Recipe[] {
    return cloneDeep(this.recipes);
  }

  getRecipeById(recipeId: string): Recipe {
    const recipes = cloneDeep(this.recipes);
    const pos = recipes.findIndex((recipe) => {
      return recipe._id === recipeId;
    });
    return recipes[pos];
  }

  toggleFavoriteRecipeById(recipeId: string): void {
    const pos = this.recipes.findIndex((recipe) => {
      return recipe._id === recipeId;
    });
    this.recipes[pos].isFavorite = !this.recipes[pos].isFavorite;
    this.recipeIsFavoriteChanged.next();
    this.toastService.showSuccess(
      this.recipes[pos].isFavorite ? 'Favorite added!' : 'Favorite removed!'
    );
  }

  deleteRecipeById(recipeId: string): void {
    const pos = this.recipes.findIndex((recipe) => {
      return recipe._id === recipeId;
    });
    this.recipes.splice(pos, 1);
    this.recipeChanged.next();
    this.toastService.showSuccess('Recipe deleted!');
  }

  saveRecipe(recipe: Recipe): void {
    if (recipe._id) {
      const pos = this.recipes.findIndex((r) => {
        return r._id === recipe._id;
      });
      this.recipes[pos] = recipe;
      this.recipeChanged.next();
      this.toastService.showSuccess('Recipe saved!');
      return;
    }
    recipe._id =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    this.recipes.push(recipe);
    this.recipeChanged.next();
    this.toastService.showSuccess('Recipe saved!');
  }
}
