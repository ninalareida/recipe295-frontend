import { Injectable } from '@angular/core';
import { Tip } from '../dataaccess/tip';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipService {

  readonly backendUrl = 'tip';

  constructor(private http: HttpClient) { }

  public getList(): Observable<Tip[]> {
    return this.http.get<Tip[]>(environment.backendBaseUrl + this.backendUrl);
  }

  public getOne(id: number): Observable<Tip> {
    return this.http.get<Tip>(environment.backendBaseUrl + this.backendUrl + `/${id}`);
  }

  public update(tip: Tip): Observable<Tip> {
    return this.http.put<Tip>(environment.backendBaseUrl + this.backendUrl + `/${tip.id}`, tip);
  }

  public save(tip: Tip): Observable<Tip> {
    return this.http.post<Tip>(environment.backendBaseUrl + this.backendUrl, tip);
  }

  public delete(id: number): Observable<HttpResponse<string>> {
    return this.http.delete<string>(environment.backendBaseUrl + this.backendUrl + `/${id}`, {observe: 'response'});
  }
}
