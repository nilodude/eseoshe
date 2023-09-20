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
  file: File = new File([""], "filename");
  isFileUploaded: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { 
    
  }

  ngOnInit(): void {
  }

  loadedFiles(event: any){
    console.log(event.target.files)
    this.file = event.target.files[0]
  }

  uploadToBackend(){
    //console.clear()
    console.log(this.uploadForm)


        if (this.file) {

           
            const formData = new FormData();

            formData.append("unarchivo", this.file);
            console.log('uploading file...')
            this.apiService.uploadFile(this.file).subscribe({
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
