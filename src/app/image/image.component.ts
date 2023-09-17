import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  collections: SelectItem[] =[];
  collectionID: number;
  collection: SelectItem = {label:'', value:''};
  image: any = {};
  imageName: string= '';
  imageData: any = [];
  keywords: string[] = [];

  constructor(private router: Router) {
    this.imageName = localStorage.getItem('imageName') as string;
    this.collections = JSON.parse(localStorage.getItem('collections') as string);
    this.collection = JSON.parse(localStorage.getItem('collection') as string);
    this.collectionID = this.collection.value;
    
    // TODO: imageData should be elegantly parsed in a separate function
    this.image = JSON.parse(localStorage.getItem('image') as string);
    this.imageData = [
      {header:'Size', value: this.image.size.join('x')},
      {header:'Type', value:'jpg'},
      {header:'Collection', value: this.collection.label},
      {header:'License', value: 'standart'},
      {header:'Price', value:'1000 atm·L/K·mol'}
    ];
    this.keywords = [];
    this.keywords=this.image.keywords;
  }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

  back(){
    this.router.navigate(['/collection']);
  }
  
  userPanel(){
    console.log('userPanel clicked');
  }

  goHome(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

  click(keyword: string){
    localStorage.setItem('keywords',keyword);
    this.router.navigate(['/keywords']);
  }
}
