import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealTypeDetailComponent } from './meal-type-detail.component';

describe('MealTypeDetailComponent', () => {
  let component: MealTypeDetailComponent;
  let fixture: ComponentFixture<MealTypeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealTypeDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
