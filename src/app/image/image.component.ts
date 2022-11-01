import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  imageName: string= '';
  categoryName: string= '';
  imageData: any = null;

  constructor(private router: Router) {
    this.imageName = localStorage.getItem('imageName') as string;
    this.categoryName = localStorage.getItem('categoryName') as string;
   }

  ngOnInit(): void {
  }

  back(){
    this.router.navigate(['/category']);
  }
  
  userPanel(){
    console.log('userPanel clicked');
  }
}
