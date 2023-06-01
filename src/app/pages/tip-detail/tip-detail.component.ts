import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, UntypedFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Tip } from 'src/app/dataaccess/tip';
import { TipService } from 'src/app/service/tip.service';

@Component({
  selector: 'app-tip-detail',
  templateUrl: './tip-detail.component.html',
  styleUrls: ['./tip-detail.component.scss']
})
export class TipDetailComponent  implements OnInit {

  tip = new Tip();
  public objForm = new UntypedFormGroup({
    name: new UntypedFormControl(''),
    comment: new UntypedFormControl('')
  });

  constructor(private router: Router, private route: ActivatedRoute,
    private snackBar: MatSnackBar, private formBuilder: UntypedFormBuilder,
    private tipService: TipService) {}

  ngOnInit(): void {
    if (this.route.snapshot.paramMap.get('id') !== null) {
      const id = Number.parseInt(this.route.snapshot.paramMap.get('id') as string);

      this.tipService.getOne(id).subscribe(obj => {
        this.tip = obj;
        this.objForm = this.formBuilder.group(obj);
      });
    } else {
      this.objForm = this.formBuilder.group(this.tip);
    }
  }

  async back() {
    await this.router.navigate(['tips']);
  }

  async save(formData: any) {
    this.tip = Object.assign(formData);

    if (this.tip.id) {
      this.tipService.update(this.tip).subscribe({
        next: () => {
          this.snackBar.open('Tip saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save tip', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    } else {
      this.tipService.save(this.tip).subscribe({
        next: () => {
          this.snackBar.open('New tip saved', 'Close', {duration: 5000});
          this.back();
        },
        error: () => {
          this.snackBar.open('Failed to save new tip', 'Close', {duration: 5000, politeness: 'assertive'});
        }
      });
    }
  }

}
