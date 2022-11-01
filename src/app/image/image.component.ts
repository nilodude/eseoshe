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

  constructor(private router: Router) {
    this.imageName = localStorage.getItem('imageName') as string;
    this.category = localStorage.getItem('category') as string;
    this.categoryName = localStorage.getItem('categoryName') as string;
    this.imageData = [{title:'Size', value: '4000x3000'}, {title:'Type', value:'jpg'} ,{title:'Category', value: this.categoryName}, {title:'License', value: 'standart'}];
   }

  ngOnInit(): void {
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
