import { Chef } from "./chef";
import { MealType } from "./meal-type";

export class Meal {
  public id!: number;
  public name = '';
  public mealType = new MealType;
  public instructions = '';
  public chef = new Chef;
}
