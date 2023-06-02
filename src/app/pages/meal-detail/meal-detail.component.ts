import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Chef } from 'src/app/dataaccess/chef';
import { Meal } from 'src/app/dataaccess/meal';
import { MealType } from 'src/app/dataaccess/meal-type';
import { ChefService } from 'src/app/service/chef.service';
import { MealService } from 'src/app/service/meal.service';
import { MealtypeService } from 'src/app/service/mealtype.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent implements OnInit {

  meal = new Meal();
  public mealtypes: MealType[] = [];
  public chefs: Chef[] = [];

  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    mealtypeId: new UntypedFormControl(''),
    instructions: new UntypedFormControl(''),
    chefId: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
    private mealService: MealService, private chefService: ChefService,
    private mealtypeService: MealtypeService) {}

  ngOnInit(): void {

    this.chefService.getList().subscribe(o => {
      this.chefs = o;
    });

    this.mealtypeService.getList().subscribe(o => {
      this.mealtypes = o;
    });

    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.mealService.getOne(id).subscribe(obj => {
        this.meal = obj;
        this.objForm = this.formBuilder.group(obj);
        this.objForm.addControl('mealtypeId', new UntypedFormControl(obj.mealType.id));
        this.objForm.addControl('chefId', new UntypedFormControl(obj.chef.id));
      });
    } else {
      this.objForm = this.formBuilder.group(this.meal);
    }
  }

  async back() {
    await this.router.navigate(['meals']);
  }

  async save(formData: any) {
    this.meal = Object.assign(formData);

    this.meal.mealType = this.mealtypes.find(o => o.id === formData.mealtypeId) as MealType;
    this.meal.chef = this.chefs.find(o => o.id === formData.chefId) as Chef;

    if (this.meal.id) {
      this.mealService.update(this.meal).subscribe({
        next: () => {
          this.snackBar.open('Meal saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save meal', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.mealService.save(this.meal).subscribe({
        next: () => {
          this.snackBar.open('New meal saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new meal', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }

}
