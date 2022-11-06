import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Router } from '@angular/router';

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
  imagesRaw: any[] = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14];
  images: any[] = [];
  liked: any = [false];
  popup: boolean = false;
  zoomedIm: number = 0;

  constructor(private router: Router) {
    
    this.liked = JSON.parse(localStorage.getItem('liked') as unknown as any);
    if(this.liked == null){
      this.liked = [];
    }
   }

  ngOnInit(): void {
    this.category = localStorage.getItem('category') as string;
    this.categoryName = this.categories.find(c=>c.value === this.category)?.label as string;
    localStorage.setItem('categoryName', this.categoryName);
    console.log('into category '+ this.categoryName);
    
    this.imagesRaw.map(i=>{
      if(this.liked[i] == null){
        this.liked[i] = this.liked[i] != null && this.liked[i];
      }
    })

    let ims = structuredClone(this.imagesRaw);
    let rand = '';
    while(
      ims.findIndex(function(v, i) {
        return v == i + 1 || (i && Math.abs(ims[i - 1] - v) == 1);
      }) != -1
    ) {
      ims.sort(function() { return Math.random() - 0.5; });
    }
    this.images = ims.map(i=>{
      return {name: i, liked: this.liked[i]}
    });
    
    console.log(this.images);
  }

  userPanel(){
    console.log('userPanel clicked');
  }

  changeCategory(){
    localStorage.setItem('category',this.category.toString());
    this.ngOnInit();
  }

  like(im: number){
    this.liked[im] = !this.liked[im];
    this.images.find(i=>i.name===im).liked = this.liked[im];
    console.log((this.liked[im] ? 'liked':'unliked')+ ' image '+im);
    localStorage.setItem('liked', JSON.stringify(this.liked));
  }

  zoom(im: number){
    this.zoomedIm= im;
    console.log('zoomed image '+im);
    this.popup = true;
  }

  clickImage(im: number){
    console.log('clicked image '+im);
    localStorage.setItem('imageName', im.toString());
    this.router.navigate(['/image']);
  }

  despliega(){
    console.log('no iyo');
  }

}
