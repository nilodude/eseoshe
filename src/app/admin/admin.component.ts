import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Subscription, finalize, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  uploadForm = new FormGroup({
    fileNames: new FormControl(''),
    shouldSync: new FormControl(false),
    collection: new FormControl('',Validators.required)
  });

  files: File[] = [];
  shouldSync: boolean = false;
  collection: string = '';
  meta: any = {};
  isFileUploaded: boolean = false;
  uploadProgress:number = 0;
  uploadSub: Subscription =of().subscribe();
  
  isFileSync: boolean = false;
  syncProgress:number = 0;
  syncSub: Subscription =of().subscribe();

  constructor(private route: ActivatedRoute, private apiService: ApiService) { 
   
  }

  ngOnInit(): void {
  }

  loadedFiles(event: any){
    console.log(event.target.files)
    this.files= []
    this.files = Array.from(event.target.files);
  }

  uploadToBackend(){
    //console.clear()
    console.log(this.uploadForm.value)
    let shouldSync = this.uploadForm.value.shouldSync as boolean;
    //for now its only one collection, pending dependency: UX/UI proposal
    this.collection = this.uploadForm.controls['collection'].value as string; 
    
    
    // meta should be an array/map (key: imageIndex , value: collection)
    this.meta.sync = shouldSync
    let inserted = 1
    if (this.files.length > 0) {
          console.clear()
          console.log('uploading files...')
                    
          this.uploadSub =
            this.apiService.uploadFiles(this.encodeFormData())
            .pipe(finalize(() => this.resetUpload())).subscribe({
              next: (result) => {
                console.clear()
                if (result.type == HttpEventType.UploadProgress) {
                  this.uploadProgress = Math.round(100 * (result.loaded / result.total));
                  console.log('\tprogress: '+this.uploadProgress+'%')
                }else{
                  console.log('files uploaded SUCCESSFULLY\n',result)
                }
                if(result.body?.inserted == 0){
                  inserted = 0;
                }
              },
              error: (error) => {
                console.log('ERROR uploading',error);
              },
              complete: () => {
                console.log('uploaded');
                this.isFileUploaded = true;
                
              }
            });
        }else{
          console.error('No files selected to upload!')
        }
  }

  // meta should be an array/map (key: imageIndex , value: collection)
  encodeFormData(){
    const formData = new FormData();
    
    this.files.forEach(f=>{
      let i = this.files.indexOf(f).toString()
      formData.append(i, f)
      this.meta[i]=this.collection
    });

    formData.append('meta',JSON.stringify(this.meta))
    
    return formData;
  }

  cancelUpload() {
    this.uploadSub.unsubscribe();
    this.resetUpload();
  }

  resetUpload() {
    this.uploadProgress = 0;
    this.uploadSub = of().subscribe();
  }

  resetSync() {
    this.syncProgress = 0;
    this.syncSub = of().subscribe();
  }

  sync(collection: string){
    console.log('sync files...')
    this.syncSub = this.apiService.sync(collection)
    .pipe(finalize(() => this.resetSync())).subscribe({
      next: (result)=>{      
        if (result.type == HttpEventType.UploadProgress) {
            this.syncProgress = Math.round(100 * (result.loaded / result.total));
            console.log('\tprogress: '+this.syncProgress+'%')
        }else{
          console.log('files sync SUCCESSFULLY\n',result)
          if(result.body?.inserted == 0){
          }
        }
        
      },
       error: (error) => {
        console.log('ERROR sync',error);
      },
      complete: () => {
        console.log('sync OK');
        this.isFileUploaded = false;
        this.isFileSync = true;
      }
    });
  }
}
