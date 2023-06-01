import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chef } from '../dataaccess/chef';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MealType } from '../dataaccess/meal-type';

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  readonly backendUrl = 'chef';

  constructor(private http: HttpClient) { }

  public getList(): Observable<Chef[]> {
    return this.http.get<Chef[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Chef> {
    return this.http.get<Chef>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(mealtype: Chef): Observable<Chef> {
    return this.http.put<Chef>(environment.backendBaseUrl + this.backendUrl + `/${mealtype.id}`, mealtype);
  }

  public save(mealtype: Chef): Observable<Chef> {
    return this.http.post<Chef>(environment.backendBaseUrl + this.backendUrl, mealtype);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
