import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  view: string = 'collection' || 'keywords';
  
  collections: SelectItem[] =[]; // SelectItem is the kind of array that "understands" angular p-dropdown component
  collectionID: number;
  collection: SelectItem = {label:'', value:''};

  keywords: string= ''

  images: any[] = [];
  liked: any = {};
  popup: boolean = false;
  isDataRetrieved: boolean = false;
  zoomedIm: any={};

  constructor(private router: Router, private apiService: ApiService) {
    // TODO: by now, localStorage is used as "data storage" within the whole frontend app, and it is fine but its just for prototyping
    // theres an elegant way to do this, DataService, so users can't inspect your application data 
    this.collections = JSON.parse(localStorage.getItem('collections') as string) || [];
    this.collection = JSON.parse(localStorage.getItem('collection') as string)|| {};
    this.collectionID = this.collection?.value;
    
    
    this.keywords =localStorage.getItem('keywords') as string;

    // "this.liked" is a temporary object containing a boolean indicating if the image is liked
    // when the "user" DB table is implemented, this "liked" data will be retrieved from DB
    this.liked = JSON.parse(localStorage.getItem('liked') as unknown as any);
    if(this.liked == null){
      this.liked = {};
    }

   }

  ngOnInit(): void {
    this.isDataRetrieved = false;
    this.collection = JSON.parse(localStorage.getItem('collection') as string);
    this.view= this.router.url.replace('/','');

    if(this.view == 'collection'){
      console.log('into collection '+ this.collection.label);
      this.getImagesByCollection(this.collection.value);
    }else if (this.view == 'keywords'){
      console.log('into keywords '+ this.keywords);
      this.setupStyle();
      this.getImagesByKeywords(this.keywords);
    }
    
  }

  setupStyle(){
    let upBarDiv = document.getElementById('upBar');
    if(upBarDiv){
      upBarDiv.style.backgroundColor = 'var(--'+this.keywords+'-300)';
    }
  }

  getImagesByCollection(collection: number){
    this.apiService.getImagesByCollection(collection).subscribe({
      next: (result)=>{
        // THIS SHOULD BE PARSED USING A CLASS, not hardcoded json
        this.images = result.map((i: any)=>{
          return {
            id: i.id,
            name: i.file_name,
            b64: i.b64,
            title: i.title,
            liked: this.liked[i.file_name],
            keywords: i.keywords.replaceAll('[','').replaceAll(']','').replaceAll("'",'').trim().split(',').map((each: string)=>each.trim()),
            size: [i.width, i.height],
            id_collection: i.id_collection
          }
        });
        
      },
      error: (error)=>{
        console.log('error retrieving images')
        console.log(error)
      },
      complete: ()=>{
        console.log('retrieved images');
        this.isDataRetrieved = true;
      }
    })
  }

  getImagesByKeywords(keywords: string){
  this.apiService.getImagesByKeywords(keywords).subscribe({
    next: (result)=>{
      // THIS SHOULD BE PARSED USING A CLASS, not hardcoded json
      this.images = result.map((i: any)=>{
        return {
          id: i.id,
          name: i.file_name,
          b64: i.b64,
          title: i.title,
          liked: this.liked[i.file_name],
          keywords: i.keywords.replaceAll('[','').replaceAll(']','').replaceAll("'",'').trim().split(',').map((each: string)=>each.trim()),
          size: [i.width, i.height],
          id_collection: i.id_collection
        }
      });
    },
    error: (error)=>{
      console.log('error retrieving images by keyword');
      console.log(error);
    },
    complete: ()=>{
      console.log('retrieved images by keyword');
      this.isDataRetrieved = true;
    }
  })
  }

  userPanel(){
    console.log('userPanel clicked');
  }

  changeCollection(){
    // taking advantage of angular component lifecycle, setting "collection" in localStorage and re-initializing the component, works
    this.collection = this.collections.find(c=>c.value == this.collectionID) as SelectItem;
    localStorage.setItem('collection',JSON.stringify(this.collection));
    this.ngOnInit();
  }

  like(imageName: any){
    this.liked[imageName] = !this.liked[imageName];
    this.images.find(i=>i.name==imageName).liked = this.liked[imageName];
    console.log((this.liked[imageName] ? 'liked':'unliked')+ ' image '+imageName);
    localStorage.setItem('liked', JSON.stringify(this.liked));
  }

  zoom(im: any){
    this.zoomedIm= im;
    console.log('zoomed image '+im.name);
    this.popup = true;
  }

  clickImage(im: any){
    console.log('clicked image '+im.name);
    localStorage.setItem('imageName', im.name);
    localStorage.setItem('image', JSON.stringify(im));

    localStorage.setItem('collection', JSON.stringify(this.collections.find(c=>c.value == im.id_collection)))

    this.router.navigate(['/image']);
  }

  despliega(event: any){
    //console.log(event.target.innerText);
    if(event.target.innerText == this.collection.label){
      this.collection = this.collections.find(c=>c.value == this.collectionID) as SelectItem;
      localStorage.setItem('collection',JSON.stringify(this.collection));
      this.router.navigate(['/collection']);
    }
  }
  
  goHome(){
    //localStorage.clear();
    this.router.navigate(['/']);
  }
}