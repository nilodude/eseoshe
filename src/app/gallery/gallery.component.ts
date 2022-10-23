import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  categories: SelectItem[] =[
    {label:'Backgrounds', value:'0'},
    {label:'Trees', value:'1'},
    {label:'Animals', value:'2'},
    {label:'Flowers', value:'3'},
    {label:'Lines', value:'4'}];
  
  category: string = '';
  categoryName: string = '';
  images2: any[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  images: any[] = [];
  constructor() {
    
   }

  ngOnInit(): void {
    this.category = localStorage.getItem('category') as string;
    
    this.categoryName = this.categories.find(c=>c.value === this.category)?.label as string;
    console.log('into category '+ this.categoryName);
    
    
    let ims = structuredClone(this.images2);
    let rand = '';
    while(
      ims.findIndex(function(v, i) {
        return v == i + 1 || (i && Math.abs(ims[i - 1] - v) == 1);
      }) != -1
    ) {
      ims.sort(function() { return Math.random() - 0.5; });
    }
    this.images = ims;
    console.log(this.images);
  }

  userPanel(){
    console.log('userPanel clicked');
  }

  changeCategory(){
    localStorage.setItem('category',this.category.toString());
    this.ngOnInit();
  }
}
