import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChefComponent } from './pages/chef/chef.component';
import { MealComponent } from './pages/meal/meal.component';
import { MealTypeComponent } from './pages/meal-type/meal-type.component';
import { TipComponent } from './pages/tip/tip.component';

const routes: Routes = [
  {path: 'meal', component: MealComponent},
  {path: 'meal-type', component: MealTypeComponent},
  {path: 'chef', component: ChefComponent},
  {path: 'tip', component: TipComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
