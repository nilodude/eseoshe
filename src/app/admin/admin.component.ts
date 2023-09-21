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
    
    if (this.files) {
          console.clear()
          console.log('uploading files...')
                    
          this.uploadSub =
            this.apiService.uploadFiles(this.encodeFormData())
            .pipe(finalize(() => this.reset())).subscribe({
              next: (result) => {
                console.clear()
                console.log('uploading files...')
                if (result.type == HttpEventType.UploadProgress) {
                  this.uploadProgress = Math.round(100 * (result.loaded / result.total));
                  console.log('\tprogress: '+this.uploadProgress+'%')
                }else{
                  console.log('files uploaded SUCCESSFULLY\n',result)
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
    this.reset();
  }

  reset() {
    this.uploadProgress = 0;
    this.uploadSub = of().subscribe();
  }

  sync(collection: string){
    this.apiService.sync(collection).subscribe();
  }
}
