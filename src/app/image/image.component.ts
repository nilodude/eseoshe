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
  lorem: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Modi, ab natus! Voluptatibus magnam dicta alias illo repellat ipsum quos neque nam atque pariatur? Excepturi odio a explicabo. Ea, illo quae!';
  keywords: string[] = [];//this.lorem.split(' '); // TODO: keywords should be retrieved from image data from DB

  constructor(private router: Router) {
    this.imageName = localStorage.getItem('imageName') as string;
    this.collections = JSON.parse(localStorage.getItem('collections') as string);
    this.collection = JSON.parse(localStorage.getItem('collection') as string);
    this.collectionID = this.collection.value;
    
    this.image = JSON.parse(localStorage.getItem('image') as string);
    // TODO: imageData should be elegantly parsed in a separate function
    this.imageData = [
      {header:'Size', value: this.image.size.join('x')},
      {header:'Type', value:'jpg'},
      {header:'Collection', value: this.collection.label},
      {header:'License', value: 'standart'},
      {header:'Price', value:'1000 atm·L/K·mol'}
    ];
    this.keywords = [];
    console.log(this.image.keywords);
    this.keywords=this.image.keywords;
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

  back(){
    this.collection = this.collections.find(c=>c.value == this.collectionID) as SelectItem;
    localStorage.setItem('collection',JSON.stringify(this.collection));
    this.router.navigate(['/collection']);
  }
  
  userPanel(){
    console.log('userPanel clicked');
  }

  despliega(event: any){
    console.log(event.target.innerText);
    if(!event.target.classList.contains('p-inputtext') && event.target.innerText == this.collection.label){
      this.collection = this.collections.find(c=>c.value == this.collectionID) as SelectItem;
      localStorage.setItem('collection',JSON.stringify(this.collection));
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate(['/collection']));
    }
  }

  goHome(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
