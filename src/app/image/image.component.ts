import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  category: string= '';
  categoryName: string= '';
  imageName: string= '';
  imageData: any = [];
  lorem: string = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit Modi, ab natus! Voluptatibus magnam dicta alias illo repellat ipsum quos neque nam atque pariatur? Excepturi odio a explicabo. Ea, illo quae!Modi, ab natus! Voluptatibus magnam dicta alias illo repellatipsum quos neque nam atque pariatur? Excepturi odio a explicabo. Ea, illo quae!Lorem ipsum dolor sit amet, consectetur adipisicing elit.Modi, ab natus! Voluptatibus magnam dicta alias illo repellatipsum quos neque nam atque pariatur? Excepturi odio a explicabo. Ea, illo quae!Lorem ipsum dolor sit amet, consectetur adipisicing elit.Modi, ab natus! Voluptatibus magnam dicta alias illo repellatipsum quos neque nam atque pariatur? Excepturi odio a explicabo. Ea, illo quae!Lorem ipsum dolor sit amet, consectetur adipisicing elit.Modi, ab natus! Voluptatibus magnam dicta alias illo repellatipsum quos neque nam atque pariatur? Excepturi odio a explicabo. Ea, illo quae!Lorem ipsum dolor sit amet, consectetur adipisicing elit.Modi, ab natus! Voluptatibus magnam dicta alias';
  keywords: string[] = this.lorem.split(' ');

  constructor(private router: Router) {
    this.imageName = localStorage.getItem('imageName') as string;
    this.category = localStorage.getItem('category') as string;
    this.categoryName = localStorage.getItem('categoryName') as string;
    this.imageData = [{title:'Size', value: '4000x3000'}, {title:'Type', value:'jpg'} ,{title:'Category', value: this.categoryName}, {title:'License', value: 'standart'}];
   }

  ngOnInit(): void {
    window.scrollTo(0,0);
  }

  back(){
    localStorage.setItem('categoryName', this.categoryName);
    localStorage.setItem('category',this.category);
    this.router.navigate(['/category']);
  }
  
  userPanel(){
    console.log('userPanel clicked');
  }
}
