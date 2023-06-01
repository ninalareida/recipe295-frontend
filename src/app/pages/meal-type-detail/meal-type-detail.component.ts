import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { MealType } from 'src/app/dataaccess/meal-type';
import { MealtypeService } from 'src/app/service/mealtype.service';

@Component({
  selector: 'app-meal-type-detail',
  templateUrl: './meal-type-detail.component.html',
  styleUrls: ['./meal-type-detail.component.scss']
})
export class MealTypeDetailComponent implements OnInit {

  mealtype = new MealType();
  public objForm = new UntypedFormGroup({
    type: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
    private mealtypeService: MealtypeService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.mealtypeService.getOne(id).subscribe(obj => {
        this.mealtype = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.mealtype);
    }
  }

  async back() {
    await this.router.navigate(['meal-types']);
  }

  async save(formData: any) {
    this.mealtype = Object.assign(formData);

    if (this.mealtype.id) {
      this.mealtypeService.update(this.mealtype).subscribe({
        next: () => {
          this.snackBar.open('Meal type saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save meal type', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.mealtypeService.save(this.mealtype).subscribe({
        next: () => {
          this.snackBar.open('New meal type saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new meal type', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }
}
