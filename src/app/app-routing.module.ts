import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefComponent } from './pages/chef/chef.component';
import { MealComponent } from './pages/meal/meal.component';
import { MealTypeComponent } from './pages/meal-type/meal-type.component';
import { TipComponent } from './pages/tip/tip.component';
import { MealTypeDetailComponent } from './pages/meal-type-detail/meal-type-detail.component';
import { MealDetailComponent } from './pages/meal-detail/meal-detail.component';

const routes: Routes = [
  {path: 'meals', component: MealComponent},
  {path: 'meal/:id', component: MealDetailComponent},
  {path: 'meal', component: MealDetailComponent},
  {path: 'meal-types', component: MealTypeComponent},
  {path: 'meal-type/:id', component: MealTypeDetailComponent},
  {path: 'meal-type', component: MealTypeDetailComponent},
  {path: 'chef', component: ChefComponent},
  {path: 'tip', component: TipComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
