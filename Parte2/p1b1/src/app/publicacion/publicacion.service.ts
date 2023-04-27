import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Publicacion, Review } from './publicacion';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  private apiUrl: string = environment.baseUrl;
  private reviews: Review[] = [];

  constructor(private http: HttpClient) { }

  setReviews(reviews: Review[]) {
    this.reviews = reviews;
  }

  getReviews(): Review[] {
    return this.reviews;
  }

  predictOneReview(text: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'predictone', { "review_es": text });
  }

  predictFile(file: any): Observable<any> {
    const formData = new FormData();
    formData.append("file", file, file.name);
    return this.http.post<any>(this.apiUrl + 'predict', formData);
  }

}
