import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  @Input('isDataRetrieved') isDataRetrieved: boolean=false;
  @Input('numResults') numResults: number = 0;

  fullTitle: boolean = false;
  collections: SelectItem[] =[]; // SelectItem is the kind of array that "understands" angular p-dropdown component
  collection: SelectItem = {label:'', value:''};

  images: any[] = [];

  searchForm = new FormGroup({
    keywords: new FormControl(''),
  });

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

  search(){
    const keywords = this.searchForm.value.keywords ?? 'art' as string;
    localStorage.setItem('keywords',keywords);
   console.log(keywords)
    if(this.router.url == '/keywords'){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/keywords']));
    }else{
      this.router.navigate(['/keywords'])
    }
  }

  userPanel(){
    console.log('userPanel clicked');
  }
}
