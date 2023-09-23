import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input('collectionID') collectionID: number = 0;
  @Input('imageName') imageName: string = '';
  @Input('keywords') keywords: string= ''
  @Input('view') view: string='';
  
  fullTitle: boolean = false;
  collections: SelectItem[] =[]; // SelectItem is the kind of array that "understands" angular p-dropdown component
  collection: SelectItem = {label:'', value:''};


  images: any[] = [];
  numResults: number = 0;

  isDataRetrieved: boolean = false;
  constructor(private router: Router) {
    this.collections = JSON.parse(localStorage.getItem('collections') as any);
  }

  ngOnInit(): void {
    this.fullTitle = window.innerWidth > 812;
  }

  gotoAdmin(){
    this.router.navigate(['/admin']);
  }
  
  changeCollection(){
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/collection']));
  }

  userPanel(){
    console.log('userPanel clicked');
  }
}
