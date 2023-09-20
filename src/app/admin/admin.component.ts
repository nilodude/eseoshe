import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  });
  files: File[] = [];
  isFileUploaded: boolean = false;
  uploadProgress:number = 0;
  uploadSub: Subscription =of().subscribe();
  
  constructor(private route: ActivatedRoute, private apiService: ApiService) { 
   
  }

  ngOnInit(): void {
  }

  loadedFiles(event: any){
    console.log(event.target.files)
    this.files = Array.from(event.target.files);
  }

  uploadToBackend(){
    //console.clear()
    console.log(this.uploadForm.value)
    let shouldSync = this.uploadForm.value.shouldSync as boolean;
    // meta should be an array/map (key: imageIndex , value: collection)
    let meta = {'sync':shouldSync, 0: 'Collection00', 1:'Collection01', 2:'Collection02'}

        if (this.files) {
          console.clear()
          console.log('uploading files...')

                    
          this.uploadSub =
            this.apiService.uploadFiles(this.encodeFormData(meta))
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
  encodeFormData(meta : any){
    const formData = new FormData();
    formData.append('meta',JSON.stringify(meta))
    this.files.forEach(f=>{
      let i = this.files.indexOf(f).toString()
      formData.append(i, f)
      
    });

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
}
