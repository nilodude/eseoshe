import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input('categoryName') categoryName: string = '';
  @Input('imageName') imageName: string = '';
  categories: SelectItem[] =[];
  category: string = '';

  constructor(private router: Router) {
    this.categories = JSON.parse(localStorage.getItem('categories') as any);
    
   }

  ngOnInit(): void {
  }
  
  despliega(event: any){
    console.log(event.target.innerText);
    if(event.target.innerText == this.categoryName){
      localStorage.setItem('categoryName', this.categoryName);
      localStorage.setItem('category',this.category);
      this.router.navigate(['/category']);
    }
  }
  changeCategory(){
    localStorage.setItem('category',this.category.toString());
    //this.ngOnInit();
  }
}
