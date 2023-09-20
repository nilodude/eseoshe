import { Injectable } from '@angular/core';
import {  HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private http: HttpClient) { }

  private apiUrl = environment.api;

  getCollections(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/collections');
  }
  
  getCollection(idCollection: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/collections/'+idCollection);
  }
 
  getImages(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/images');
  }

  getImagesByCollection(idCollection: number): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/collection/'+idCollection);
  }

  getImagesByFileNames(fileNames: string): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/images?fileNames='+fileNames)
  }

  getImagesByKeywords(keywords: string): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/images?keywords='+keywords)
  }

  uploadFiles(files: File[], shouldSync: boolean): Observable<any>{
    const formData = new FormData();
    files.forEach(f=>formData.append(files.indexOf(f).toString(), f));
    return this.http.post(this.apiUrl+'/upload?sync='+shouldSync,formData,{
      reportProgress: true,
      observe: 'events'
  });
  }
}
