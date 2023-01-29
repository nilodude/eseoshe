import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  collections: SelectItem[] =[]; // SelectItem is the kind of array that "understands" angular p-dropdown component
  collectionID: number;
  collection: SelectItem = {label:'', value:''};
  images: any[] = [];
  liked: any = [{}];
  popup: boolean = false;
  isDataRetrieved: boolean = false;
  zoomedIm: any={};

  constructor(private router: Router, private apiService: ApiService) {
    // TODO: by now, localStorage is used as "data storage" within the whole frontend app, and it is fine but its just for prototyping
    // theres an elegant way to do this, DataService, so users can't inspect your application data 
    this.collections = JSON.parse(localStorage.getItem('collections') as string);
    this.collection = JSON.parse(localStorage.getItem('collection') as string);
    this.collectionID = this.collection.value;
    
    // "this.liked" is a temporary array containing a boolean indicating if the image is liked
    // when the "user" DB table is implemented, this "liked" data will be retrieved from DB
    this.liked = JSON.parse(localStorage.getItem('liked') as unknown as any);
    if(this.liked == null){
      this.liked = [{}];
    }
   }

  ngOnInit(): void {
    this.collection = JSON.parse(localStorage.getItem('collection') as string);
    
    console.log('into collection '+ this.collection.label);
    
    this.getImagesByCollection(this.collection.value);
    
    // this.images should be retrieved from DB. "getImagesByCollection() or similar"
    // this.images = this.getRandomTestImages().map(i=>{
    //   return {name: i, liked: this.liked[i]}
    // });
    
    console.log(this.images);
  }


  getImagesByCollection(collection: number){
    this.apiService.getImagesByCollection(collection).subscribe({
      next: (result)=>{
        // THIS SHOULD BE PARSED USING A CLASS, not hardcoded json
        this.images = result.map((i: any)=>{
          return {name: i.file_name, b64: i.b64, title: i.title,liked: this.liked[i.file_name]}
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

  getRandomTestImages(){
    const imagesRaw = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
    imagesRaw.map(i=>{
      if(this.liked[i] == null){
        this.liked[i] = this.liked[i] != null && this.liked[i];
      }
    });
    
    let ims = structuredClone(imagesRaw);
    let rand = '';
    while(
      ims.findIndex(function(v, i) {
        return v == i + 1 || (i && Math.abs(ims[i - 1] - v) == 1);
      }) != -1
    ) {
      ims.sort(function() { return Math.random() - 0.5; });
    }
    return ims;
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
    console.log('zoomed image '+im.file_name);
    this.popup = true;
  }

  clickImage(im: number){
    console.log('clicked image '+im);
    localStorage.setItem('imageName', im.toString());
    this.router.navigate(['/image']);
  }

  despliega(event: any){
    console.log(event.target.innerText);
    if(event.target.innerText == this.collection.label){
      this.collection = this.collections.find(c=>c.value == this.collectionID) as SelectItem;
      localStorage.setItem('collection',JSON.stringify(this.collection));
      this.router.navigate(['/collection']);
    }
  }
  
  getCollectionName(collectionID: number){
    return this.collections.find(c=>c.value == collectionID)?.label as string;
  }

  goHome(){
    //localStorage.clear();
    this.router.navigate(['/']);
  }
}
