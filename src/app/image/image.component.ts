import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  categories: SelectItem[] =[];
  category: number;
  categoryName: string= '';
  imageName: string= '';
  imageData: any = [];
  lorem: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Modi, ab natus! Voluptatibus magnam dicta alias illo repellat ipsum quos neque nam atque pariatur? Excepturi odio a explicabo. Ea, illo quae!';
  keywords: string[] = this.lorem.split(' ');

  constructor(private router: Router) {
    this.imageName = localStorage.getItem('imageName') as string;
    this.categories = JSON.parse(localStorage.getItem('categories') as string);
    this.category = parseInt(localStorage.getItem('category') as string);
    this.categoryName = localStorage.getItem('categoryName') as string;
    this.imageData = [{title:'Size', value: '4000x3000'}, {title:'Type', value:'jpg'} ,{title:'Category', value: this.categoryName},
     {title:'License', value: 'standart'}, {title:'Price', value:'1000 atm·L/K·mol'}];
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

  back(){
    localStorage.setItem('categoryName', this.categoryName);
    localStorage.setItem('category',this.category.toString());
    this.router.navigate(['/category']);
  }
  
  userPanel(){
    console.log('userPanel clicked');
  }

  despliega(event: any){
    console.log(event.target.innerText);
    if(!event.target.classList.contains('p-inputtext') && event.target.innerText == this.categoryName){
      localStorage.setItem('categoryName', this.categoryName);
      localStorage.setItem('category',this.category.toString());
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>this.router.navigate(['/category']));
    }
  }

  goHome(){
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
