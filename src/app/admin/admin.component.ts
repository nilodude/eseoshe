import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  uploadForm = new FormGroup({
    fileNames: new FormControl(''),
    autoSync: new FormControl(''),
  });
  files: File[] = [];
  isFileUploaded: boolean = false;

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
    console.log(this.uploadForm)


        if (this.files) {

            console.log('uploading files...')

            this.apiService.uploadFiles(this.files).subscribe({
              next: (result)=> {
                console.log(result)
              },
              error: (error)=>{
                console.log('error uploading');
                console.log(error);
              },
              complete: ()=>{
                console.log('uploaded');
                this.isFileUploaded = true;
              }
            });
        }
  }
}
