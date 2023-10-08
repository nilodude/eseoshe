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
  private keywordsUrl = environment.keywordsUrl;
  private clientID = environment.clientID;
  private clientKey = environment.clientKey;

  insertCollection(name: string): Observable<any>{
    return this.http.post(this.apiUrl+'/collections',{name: name});
  }

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
    return this.http.get<any>(this.apiUrl+'/collections/images/'+idCollection);
  }

  getImagesByFileNames(fileNames: string): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/images?fileNames='+fileNames)
  }

  getInactiveImages(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/images/inactive')
  }

  getImagesByKeywords(keywords: string): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/images?keywords='+keywords)
  }

  uploadFiles(formData: FormData): Observable<any>{
    return this.http.post(this.apiUrl+'/upload',formData);
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

  updateFiles(files: any):Observable<any>{
    return this.http.post<any>(this.apiUrl+'/update',{files})
  }

  getKeywords(data: FormData):Observable<any>{
    return this.http.post<any>(this.keywordsUrl+'?num_keywords=30',data,{headers: {
      'Authorization': 'Basic ' + btoa(this.clientID+':'+this.clientKey)
      }})
  }
}
