import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }

  private apiUrl = 'http://localhost:3000/pestock';

  getCollections(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/collections');
  }
  
  getCollection(idCollection: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/collections'+idCollection);
  }
 
  getImages(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/images');
  }

  getImagesByCollection(idCollection: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/collection'+idCollection);
  }
}
