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

  getImagesNoCollection(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/images/noCollection')
  }

  getImagesByKeywords(keywords: string): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/images?keywords='+keywords)
  }

  uploadFiles(formData: FormData): Observable<any>{
    return this.http.post(this.apiUrl+'/upload',formData,{
      reportProgress: true,
      observe: 'events'
  });
  }

  sync(collection: string): Observable<any>{
    return this.http.post<any>(this.apiUrl+'/sync?dir='+collection,{},{
      reportProgress: true,
      observe: 'events'
  })
  }

  removeFile(id: number): Observable<any>{
    return this.http.delete<any>(this.apiUrl+'/delete/'+id)
  }
}
