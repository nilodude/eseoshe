import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Subscription, finalize, of } from 'rxjs';
import { HttpEventType } from '@angular/common/http';
import exifr from 'exifr'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  uploadForm = new FormGroup({
    fileNames: new FormControl(''),
    collection: new FormControl('',Validators.required)
  });

  files: File[] = [];
  collection: string = '';
  meta: any = {};
  isFileUploaded: boolean = false;
    
  isFileSync: boolean = false;
  syncProgress:number = 0;
  syncSub: Subscription =of().subscribe();

  images: any[] = []
  loadedImages: any[] = []
  noCollection: any[] = []
  isDataRetrieved: boolean = false

  dragged: any = {}
  dropped: any[] = []

  uploadView: boolean = false;

  constructor(private route: ActivatedRoute, private apiService: ApiService) { 
   
  }

  ngOnInit(): void {
    this.loadedImages = [];
    this.noCollection = [];
    this.getImagesNoCollection();

  }

  getImagesNoCollection(){
    this.apiService.getImagesNoCollection().subscribe({
      next: (result)=>{
        this.noCollection = result.map((i: { id: any; file_name: string | number; b64: any; title: any; keywords: { replaceAll: (arg0: string, arg1: string) => { (): any; new(): any; replaceAll: { (arg0: string, arg1: string): { (): any; new(): any; replaceAll: { (arg0: string, arg1: string): string; new(): any; }; }; new(): any; }; }; }; width: any; height: any; id_collection: any; })=>{
          return {
            id: i.id,
            name: i.file_name,
            b64: 'data:image/png;base64,'+i.b64,
            title: i.title,
            liked: '',
            keywords: i.keywords.replaceAll('[','').replaceAll(']','').replaceAll("'",'').trim().split(',').map((each: string)=>each.trim()),
            size: [i.width, i.height],
            id_collection: i.id_collection
        }})
        this.images = structuredClone(this.noCollection)
        this.isDataRetrieved = true;
      }
    })
  }

  loadedFiles(event: any) {
    this.isDataRetrieved = false;
    console.log(event.target.files)
    this.files = []
    this.files = Array.from(event.target.files);
    
    if (this.files.length > 0) {
      this.files.forEach(f => {
        let title = ''
        let keywords = ''
        exifr.parse(f, true).then(parsed => {
          title = parsed.ImageDescription
          keywords = parsed.subject?.split(',').map((k: string) => k.trim())
          
          const reader = new FileReader();
          reader.readAsDataURL(f)
          reader.onloadend = () => {
            const b64 = (reader.result as string)//.replace('data:image/jpeg;base64,','').replace('data:image/png;base64,','')
            this.loadedImages.push({
              id: null,
              name: f.name,
              b64: b64,
              title: title,
              liked: '',
              keywords: keywords,
              size: [0, 0],
              id_collection: null
            })
            if (this.files.length == this.loadedImages.length) {
              this.isDataRetrieved = true;
              this.uploadView = true;
            }
          }//onLoadEnd
        })//parse
      })//forEach
    }
  }

  switch(){
    this.uploadView = !this.uploadView
  }

  uploadToBackend() {
    //for now its only one collection, pending dependency: UX/UI proposal
    this.collection = this.uploadForm.value.collection as string;

    if (this.collection != '') {
      if (this.files.length > 0 || this.dropped.length > 0) {
        console.log('uploading files...')
        this.apiService.uploadFiles(this.encodeFormData()).subscribe({
          next: (result) => {
            console.log('files uploaded SUCCESSFULLY\n', result)
          },
          error: (error) => {
            console.log('ERROR uploading', error);
          },
          complete: () => {
            console.log('uploaded');
            this.isFileUploaded = true;
          }
        });
      } else {
        console.error('No files selected to upload!')
      }
    } else {
      console.error('No collection selected to upload!')
    }
  }

  // meta should be an array/map (key: imageIndex , value: collection)
  encodeFormData(){
    const formData = new FormData();
    
    this.files.forEach(f=>{
      let i = this.files.indexOf(f)
      formData.append(i.toString(), f)
      this.meta[i]={collection: this.collection, title: this.dropped[i].title, keywords: this.dropped[i].keywords}
    });
    console.log('meta')
    console.log(this.meta)
    formData.append('meta',JSON.stringify(this.meta))
    
    return formData;
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
          
        }
      },
       error: (error) => {
        console.log('ERROR sync',error);
      },
      complete: () => {
        console.log('sync OK');
        this.isFileUploaded = false;
        this.isFileSync = true;
        this.dropped = [];
        console.log(this.loadedImages)
      }
    });
  }

  dragStart(image: any) {
    this.dragged = image;
    console.log('dragged')
    console.log(this.dragged)
  }
  
  drop() {
    if (this.dragged) {
        let arr = this.uploadView ? this.loadedImages : this.noCollection
        let index = arr.indexOf(this.dragged)
        this.dropped.push(this.dragged);
        arr.splice(index,1);
        console.log('dropped ')
        console.log(this.dropped)
        this.dragged = null;
    }
  }
  
  dragEnd() {
    this.dragged = null;
  }
}