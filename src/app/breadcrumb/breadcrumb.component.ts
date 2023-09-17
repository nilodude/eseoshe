import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input('collectionID') collectionID: number = 0;
  @Input('imageName') imageName: string = '';
  @Input('keywords') keywords: string= ''
  @Input('view') view: string='';
  @Output('changeCollection') changeCollection: EventEmitter<number> = new EventEmitter();


  collections: SelectItem[] =[];
  collection: SelectItem = {label:'', value:''};


  constructor(private router: Router) {
    this.collections = JSON.parse(localStorage.getItem('collections') as any);
    this.keywords =localStorage.getItem('keywords') as string;
   }

  ngOnInit(): void {
    this.collection = JSON.parse(localStorage.getItem('collection') as string);
  }

  ngAfterViewChecked(){
    this.setupStyle();
  }

  setupStyle() {
    let bgcolor = 'var(--' + this.keywords + '-400,' + this.keywords + ')';
    let kwTitle = document.getElementById('keywordTitle');
    if (kwTitle) {
      kwTitle.style.color = bgcolor;
    }
  }
  
  despliega(event: any){
    console.log(event.target.innerText);
    if(event.target.innerText == this.collection.label){
      this.collection = this.collections.find(c=>c.value == this.collectionID) as SelectItem;
      localStorage.setItem('collection',JSON.stringify(this.collection));
      this.router.navigate(['/collection']);
    }
  }
  emitChangeCollection(){
    this.collection = this.collections.find(c=>c.value == this.collectionID) as SelectItem;
    localStorage.setItem('collection',JSON.stringify(this.collection));
    this.changeCollection.emit();
  }

  goHome(){
    //localStorage.clear();
    this.router.navigate(['/']);
  }
}
