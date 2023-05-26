import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Meal } from '../dataaccess/meal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealService {

  readonly backendUrl = 'meal';

  constructor(private http: HttpClient) {
  }

  public getList(): Observable<Meal[]> {
    return this.http.get<Meal[]>(environment.backendBaseUrl + this.backendUrl);
  }
}
