import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefComponent } from './pages/chef/chef.component';
import { MealComponent } from './pages/meal/meal.component';
import { MealTypeComponent } from './pages/meal-type/meal-type.component';
import { TipComponent } from './pages/tip/tip.component';
import { MealTypeDetailComponent } from './pages/meal-type-detail/meal-type-detail.component';
import { MealDetailComponent } from './pages/meal-detail/meal-detail.component';
import { ChefDetailComponent } from './pages/chef-detail/chef-detail.component';
import { TipDetailComponent } from './pages/tip-detail/tip-detail.component';

const routes: Routes = [
  {path: 'meals', component: MealComponent},
  {path: 'meal/:id', component: MealDetailComponent},
  {path: 'meal', component: MealDetailComponent},
  {path: 'meal-types', component: MealTypeComponent},
  {path: 'meal-type/:id', component: MealTypeDetailComponent},
  {path: 'meal-type', component: MealTypeDetailComponent},
  {path: 'chefs', component: ChefComponent},
  {path: 'chef/:id', component: ChefDetailComponent},
  {path: 'chef', component: ChefComponent},
  {path: 'tips', component: TipComponent},
  {path: 'tip/:id', component: TipDetailComponent},
  {path: 'tip', component: TipDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
