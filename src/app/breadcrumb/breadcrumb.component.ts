import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input('collectionName') collectionName: string = '';
  @Input('imageName') imageName: string = '';
  collections: SelectItem[] =[];
  collection: string = '';

  constructor(private router: Router) {
    this.collections = JSON.parse(localStorage.getItem('collections') as any);
    
   }

  ngOnInit(): void {
  }
  
  despliega(event: any){
    console.log(event.target.innerText);
    if(event.target.innerText == this.collectionName){
      localStorage.setItem('collectionName', this.collectionName);
      localStorage.setItem('collection',this.collection);
      this.router.navigate(['/collection']);
    }
  }
  changeCategory(){
    localStorage.setItem('collection',this.collection.toString());
    //this.ngOnInit();
  }
}
