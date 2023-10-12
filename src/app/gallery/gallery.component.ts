import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, SelectItem } from 'primeng/api';
import { Router } from '@angular/router';
import { ApiService } from './../services/api.service';
import { Observable, of } from 'rxjs';
import { environment } from './../../environments/environment';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
  providers: [ConfirmationService]
})
export class GalleryComponent implements OnInit {
  view: string = 'collection' || 'keywords';
  fullTitle: boolean = false;

  collections: SelectItem[] =[]; // SelectItem is the kind of array that "understands" angular p-dropdown component
  collectionID: number;
  collection: SelectItem = {label:'', value:''};

  keywords: string= ''

  images: any[] = [];
  numResults: number = 0;
  liked: any = {};
  popup: boolean = false;
  isDataRetrieved: boolean = false;

  zoomedIm: any={};
  
  imageMenu: any[] = []
  admin:boolean = environment.admin
  clickedOverlay: boolean = false;

  constructor(private router: Router,
     private apiService: ApiService,
     private confirmationService: ConfirmationService) {
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
    this.isDataRetrieved = false;
    this.admin = environment.admin
   }

  ngOnInit(): void {
    this.isDataRetrieved = false;
    this.collection = JSON.parse(localStorage.getItem('collection') as string);
    this.view = this.router.url.replace('/','');

    this.getImages();
  }

  getImages(){
    let request: Observable<any> = of()

    if(this.view == 'collection'){
      console.log('into collection '+ this.collection.label);
      request  = this.apiService.getImagesByCollection(this.collection.value) as Observable<any>;
    }else if (this.view == 'keywords'){
      console.log('into keywords '+ this.keywords);
      this.collectionID = 0;
      request = this.apiService.getImagesByKeywords(this.keywords) as Observable<any>;
    }

    request.subscribe({
      next: (result: any[])=>{
        // THIS SHOULD BE PARSED USING A CLASS, not hardcoded json
        result.forEach((i: any)=>{
          const parsed = {
            id: i.id,
            name: i.file_name,
            b64: i.b64,
            title: i.title,
            liked: this.liked[i.file_name],
            keywords: i.keywords.replaceAll('[','').replaceAll(']','').replaceAll("'",'').trim().split(',').map((each: string)=>each.trim()),
            size: [i.width, i.height],
            id_collection: i.id_collection
          }
          this.images.push(parsed)

          this.imageMenu[parsed.name] = [
            {
              label: 'Open',
              icon: 'pi pi-fw pi-image',
              command: () => this.clickImage(parsed)
            },
            {
              label: 'Like',
              icon: 'pi pi-fw pi-heart',
              command: () => this.like(parsed.name)
            },
            {
              label: 'Zoom',
              icon: 'pi pi-fw pi-search-plus',
              command: () => this.zoom(parsed)
            }
          ]
        });
        this.numResults = this.images.length;

      },
      error: (error)=>{
        console.log('error retrieving images',error)
      },
      complete: ()=>{
        console.log('retrieved images');
        this.isDataRetrieved = true;
      }
    })
  }

  like(imageName: any){
    this.liked[imageName] = !this.liked[imageName];
    this.images.find(i=>i.name==imageName).liked = this.liked[imageName];
    console.log((this.liked[imageName] ? 'liked':'unliked')+ ' image '+imageName);
    localStorage.setItem('liked', JSON.stringify(this.liked));
    this.clickedOverlay = true;
  }

  zoom(im: any){
    this.zoomedIm= im;
    console.log('zoomed image '+im.name);
    this.popup = true;
    this.clickedOverlay = true;
  }

  delete(id: number) {
    this.clickedOverlay = true;
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        console.log('removing image ID=' + id)
        this.apiService.removeFile(id).subscribe({
          next: (result) => {
            console.log('removed image', result)
            let index = this.images.findIndex(i=>i.id==id)
            this.images.splice(index, 1);
          },
          error: (error) => {
            console.error('error removing image', error);
          }
        })
      },
      reject: () => {
        this.confirmationService.close()
      }
    });
  }

  clickImage(im: any){
    if(!this.clickedOverlay){
      console.log('clicked image '+im.name);
      localStorage.setItem('imageName', im.name);
      localStorage.setItem('image', JSON.stringify(im));

      localStorage.setItem('collection', JSON.stringify(this.collections.find(c=>c.value == im.id_collection)))

      this.router.navigate(['/image']);
    }else{
      this.clickedOverlay = false;
    }
  }
  
  setCover(im: any){
    this.apiService.setCover(im).subscribe({
      next: (result)=>{
        console.log(result)
      },
      error: (error=>{
        console.log(error)
      })
    })
  }

  goHome(){
    //localStorage.clear();
    this.router.navigate(['/']);
  }
}