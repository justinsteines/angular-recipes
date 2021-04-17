export interface Recipe {
  _id: string;
  name: string;
  prepTime?: string;
  cookTime?: string;
  isFavorite: boolean;
  imageUrl?: string;
  ingredients: { name: string; amount?: string }[];
  instructions: string[];
}
