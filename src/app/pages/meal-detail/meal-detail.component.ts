import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Meal } from 'src/app/dataaccess/meal';
import { MealService } from 'src/app/service/meal.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss']
})
export class MealDetailComponent implements OnInit {

  meal = new Meal();
  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    instructions: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
    private mealService: MealService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.mealService.getOne(id).subscribe(obj => {
        this.meal = obj;
        this.objForm = this.formBuilder.group(obj);
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
