import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import {  firstValueFrom } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  msgs: Message[] = []  
  collections: any= []
  panelSizes: number[] = [99.9,0.1]
  uploadForm = new FormGroup({
    fileNames: new FormControl(''),
  });
  image: any = {}
  showIm: boolean = false
  editForm = new FormGroup({
    title: new FormControl(''),
    keywords: new FormControl('',Validators.required)
  });
  formKeywords: string[]=[]

  files: File[] = [];
  allFiles: File[] = [];

  collection: string = '';
  meta: any = {};
    
  syncProgress:number = 0;

  loadedImages: any[] = []
  noCollection: any[] = []
  isDataRetrieved: boolean = false

  dragged: any = {}
  dropped: any = {}

  uploadView: boolean = false;

  uploadResult: any[] = [{inserted:[], resized: [], updated: []}];
  showResult: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getCollections()
    this.loadedImages = [];
    this.noCollection = [];
    this.getInactiveImages();

    this.editForm.controls['keywords'].valueChanges.subscribe(value => {
      this.image.keywords = value
    });
  }

  insertCollection(name: string){
    this.msgs= []
    this.msgs.push({severity:'info', summary:'Adding new collection...'})
    this.apiService.insertCollection(name).subscribe({
      next: (result)=>{
        this.msgs= []
        console.log(result)
        if(result.inserted?.id){
          this.msgs.push({severity:'success', summary: 'Collection added!'})
          this.isDataRetrieved = true
          this.collection = ''
          this.getCollections()
        }else{
          this.msgs.push({severity:'warn', summary: 'Collection already exists!'})
        }
      },error: (error)=>{
        this.msgs= []
        this.msgs.push({severity:'error', summary:'Error adding new collection'})
        console.error(error)
      }
    })
  }

  isDroppedEmpty(){
    return !Object.values(this.dropped).some((v:any)=>v.length > 0) 
  }

  getInactiveImages(){
    this.apiService.getInactiveImages().subscribe({
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
        this.isDataRetrieved = true;
      }
    })
  }

  loadedFiles(event: any) {
    this.isDataRetrieved = false;
    this.msgs = []
    this.msgs.push({severity:'info', summary:'Loading...'})
    console.log('loading files:',event.target.files)

    this.files = []
    this.files = Array.from(event.target.files);
    this.allFiles = this.allFiles.concat(this.files)

    const ExifReader = require('exifreader')

    if (this.files.length > 0) {
      this.files.forEach(f => {
        const reader = new FileReader();
        reader.readAsDataURL(f)
        reader.onloadend =async () => {
          const b64 = (reader.result as string)
          const metadata = await ExifReader.load(reader.result, {
             expanded: false,
            includeUnknown: false
          }).catch((error: any)=>{
            console.log(error)
            
          });
                    
          // const data = new FormData()
          // data.append('data', f)
          // this.apiService.getKeywords(data).subscribe({
          //   next: (result)=>{
          //    this.formKeywords = result.keywords.map((k:any)=>k.keyword)
          //   },
          //   error: (error)=>console.error(error)
          // })

          if(metadata){

          let title = metadata.ImageDescription?.description
          let keywords = metadata.subject?.description.split(',').map((k: string) => k.trim())
          let size = [metadata['Image Width']?.value,metadata['Image Height']?.value]
           
          console.log(metadata)
            
          this.loadedImages.push({
            id: null,
            name: f.name,
            b64: b64,
            title: title ?? f.name,
            liked: '',
            keywords: keywords ?? ['keyword'+f.name],
            size: size,
            id_collection: null
          })
          if (this.files.length == this.loadedImages.length) {
            this.isDataRetrieved = true;
            this.uploadView = true;
            this.msgs = []
            this.msgs.push({severity:'success', summary:'Loaded'})
          }
        }
        }//onLoadEnd
      })//forEach
    }
  }

  switch(){
    this.uploadView = !this.uploadView
  }

  resetUI(){
    this.panelSizes = [99.9,0.1]
    this.showIm = false
    this.image = null
    this.resetDropped()
    this.files= []
    this.uploadForm.controls["fileNames"].setValue('')
    this.showResult = true;
  }

  uploadToBackend() {
    let entries = Object.entries(this.dropped)
    let numRequests = entries.filter((d:any)=>d[1].length > 0).length
    let requestDone = 0
    this.isDataRetrieved = false;
    this.uploadResult = []
    this.msgs = []
    this.msgs.push({severity:'info', summary:'Uploading...'})
    entries.forEach(async e=>{

      const collectionName = e[0] as string;
      const images = e[1] as [];

      if(images?.length > 0){
        if (this.allFiles.length > 0){
          console.log('uploading files to /'+collectionName+'...')
          
          let result = await firstValueFrom(this.apiService.uploadFiles(this.encodeFormData(collectionName)))
          .then((result)=>{
            this.uploadResult[requestDone] = {collection: '',inserted:[], resized: [], updated: []}
            this.uploadResult[requestDone].inserted = this.uploadResult[requestDone].inserted.concat(result.inserted)
            this.uploadResult[requestDone].resized = this.uploadResult[requestDone].resized.concat(result.resized)
            this.uploadResult[requestDone].updated = this.uploadResult[requestDone].updated.concat(result.updated)
            this.uploadResult[requestDone].collection = collectionName
            requestDone++
            this.syncProgress = Math.round(100*(requestDone/numRequests))
            console.log(result)
          })
          .catch(error=>{
            console.log('ERROR uploading', error);
            this.msgs = []
            this.msgs.push({severity:'error', summary:'ERROR uploading files'})
          }).finally(()=>{
            console.log('/'+collectionName+' files uploaded SUCCESSFULLY\n')
            
            if(requestDone == numRequests){
              this.isDataRetrieved = true;
              console.log(this.uploadResult)
              console.log(JSON.stringify(this.uploadResult))
              this.msgs = []
              this.msgs.push({severity:'success', summary:'Upload complete!'})
            }
            this.resetUI();
          });

          console.log(result)
          
        }else if(this.allFiles.length == 0){
          console.log('updating files to /'+collectionName+'...')
          this.dropped[collectionName].map((d: { b64: string; })=>d.b64 = '')
          //this sould be collectionID, collectionName is only for images with NON EXISTING collection
          this.dropped[collectionName].map((d: { id_collection: any; })=>d.id_collection = collectionName)
          this.apiService.updateFiles(this.dropped[collectionName]).subscribe({
            next: (result)=>{
              console.log('files updated SUCCESSFULLY\n',result)
              this.msgs = []
              this.msgs.push({severity:'success', summary:'Update complete!'})
            },
            error: (error)=>{
              console.error('ERROR updating files',error)
              this.msgs = []
              this.msgs.push({severity:'error', summary:'ERROR updating files'})
            }
          })
        }else {
          console.error('No files selected to upload!')
        }
      }
    })
  }

  encodeFormData(collectionName: string){
    const formData = new FormData();
    this.meta = {}

    this.dropped[collectionName].forEach((d: any)=>{
      const f= this.allFiles.find((f: { name: string; })=>f.name == d.name)
      if(f){
        const index = this.allFiles.indexOf(f)
        this.allFiles.slice(index,1)
        formData.append(d.name, f)
        this.meta[d.name]={
          collection: collectionName,
          title: d.title ?? 'ERTITULO',
          keywords: d.keywords ?? ['los','ki','worls'],
          size : d.size
        }
      }
    });
    console.log('metadata:',this.meta)
    formData.append('meta',JSON.stringify(this.meta))
    
    return formData;
  }

  dragStart(image: any) {
    this.dragged = null
    this.msgs = []

    if(!image.keywords || image.keywords.length == 0 ){
      this.msgs.push({severity:'error', summary:'Empty keywords!'})
    }else if(!image.title || image.title == ''){
      this.msgs.push({severity:'error', summary:'Empty title!'})
    }else{
      this.dragged = image;
      console.log('dragged')
      console.log(this.dragged)
    }
  }
  
  drop(collectionName: string) {
    if (this.dragged) {
        this.dragged.collection = collectionName
        //maybe its a good place to set the collection, depending on where it dropped
        let arr = this.uploadView ? this.loadedImages : this.noCollection
        let index = arr.indexOf(this.dragged)
        this.dropped[collectionName].push(this.dragged);
        arr.splice(index,1);
        console.log('dropped:',this.dropped)
        this.dragged = null;
    }
  }
  
  dragEnd() {
    this.dragged = null;
  }

  editImage(im: any){
    this.image = im
    this.panelSizes = [70, 30]
    this.editForm.controls["title"].setValue(this.image.title)
    this.editForm.controls["keywords"].setValue(this.image.keywords ?? this.formKeywords)
    this.showIm = true
  }

  onEdit(){
    this.image.title = this.editForm.value.title ?? ''
  }

  getCollections(){
    this.collections = [];
    this.apiService.getCollections().subscribe({
      next: (result)=>{
        this.collections = result.map((c: any)=>{
          return {label: c['name'], value: c['id']}
        });
      },
      error: (error)=>{
        console.log('error retrieving collections')
        console.log(error)
      },
      complete: ()=>{
        console.log('retrieved collections');
        this.isDataRetrieved = true;
        this.resetDropped()
        localStorage.setItem('collections',JSON.stringify(this.collections));
      }});
  }

  
  resetDropped(){
    this.collections.map((c: { label: string })=>this.dropped[c.label] = [])
  }
}
