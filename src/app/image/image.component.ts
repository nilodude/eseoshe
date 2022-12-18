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
  imageName: string= '';
  imageData: any = [];
  lorem: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Modi, ab natus! Voluptatibus magnam dicta alias illo repellat ipsum quos neque nam atque pariatur? Excepturi odio a explicabo. Ea, illo quae!';
  keywords: string[] = this.lorem.split(' '); // TODO: keywords should be retrieved from image data from DB

  constructor(private router: Router) {
    this.imageName = localStorage.getItem('imageName') as string;
    this.collections = JSON.parse(localStorage.getItem('collections') as string);
    this.collection = JSON.parse(localStorage.getItem('collection') as string);
    this.collectionID = this.collection.value;
    // TODO:imageData should be retrieved from DB
    this.imageData = [{title:'Size', value: '4000x3000'}, {title:'Type', value:'jpg'} ,{title:'Collection', value: this.collection.label},
     {title:'License', value: 'standart'}, {title:'Price', value:'1000 atm·L/K·mol'}];
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
