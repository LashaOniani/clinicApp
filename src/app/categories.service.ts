import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { CategoriesModel } from './Models/CategoriesModel';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private categories: CategoriesModel[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getCategories(): Observable<CategoriesModel[]> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.get<CategoriesModel[]>("http://localhost:5052/api/Category/Get_categories", httpOptions);
  }

  get catList(): CategoriesModel[] {
    return this.categories;
  }

  set catList(list: CategoriesModel[]) {
    this.categories = list;
  }
}
