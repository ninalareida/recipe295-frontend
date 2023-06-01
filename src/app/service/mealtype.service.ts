import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MealType } from '../dataaccess/meal-type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MealtypeService {

  readonly backendUrl = 'meal-type';

  constructor(private http: HttpClient) { }

  public getList(): Observable<MealType[]> {
    return this.http.get<MealType[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<MealType> {
    return this.http.get<MealType>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(mealtype: MealType): Observable<MealType> {
    return this.http.put<MealType>(environment.backendBaseUrl + this.backendUrl + `/${mealtype.id}`, mealtype);
  }

  public save(mealtype: MealType): Observable<MealType> {
    return this.http.post<MealType>(environment.backendBaseUrl + this.backendUrl, mealtype);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
