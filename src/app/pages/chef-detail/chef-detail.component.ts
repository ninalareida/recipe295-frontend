import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Chef } from 'src/app/dataaccess/chef';
import { ChefService } from 'src/app/service/chef.service';

@Component({
  selector: 'app-chef-detail',
  templateUrl: './chef-detail.component.html',
  styleUrls: ['./chef-detail.component.scss']
})
export class ChefDetailComponent implements OnInit {

  chef = new Chef();
  public objForm = new UntypedFormGroup({
    firstname: new UntypedFormControl(''),
    lastname: new UntypedFormControl(''),
    comment: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
    private chefService: ChefService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.chefService.getOne(id).subscribe(obj => {
        this.chef = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.chef);
    }
  }

  async back() {
    await this.router.navigate(['chefs']);
  }

  async save(formData: any) {
    this.chef = Object.assign(formData);

    if (this.chef.id) {
      this.chefService.update(this.chef).subscribe({
        next: () => {
          this.snackBar.open('Chef saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save chef', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.chefService.save(this.chef).subscribe({
        next: () => {
          this.snackBar.open('New chef saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new chef', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }

}
