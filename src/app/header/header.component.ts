import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, SelectItem } from 'primeng/api';
import { environment } from './../../environments/environment';

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

  msgs: Message[] = []

  admin: boolean = environment.admin

  constructor(private router: Router) {
    this.collections = JSON.parse(localStorage.getItem('collections') as any);
    this.admin = environment.admin
  }

  ngOnInit(): void {
    this.fullTitle = window.innerWidth > 812;
    
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

  gotoAdmin(){
    this.router.navigate(['/admin']);
  }
  
  changeCollection(){
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/collection']));
  }

  search(){
    this.msgs = []
    const keywords = this.searchForm.value.keywords ?? 'art' as string;
    localStorage.setItem('keywords',keywords);
    console.log(keywords)
    if(keywords != ''){
      if(this.router.url == '/keywords'){
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
        this.router.navigate(['/keywords']));
      }else{
        this.router.navigate(['/keywords'])
      }
    }else{
      this.msgs.push({severity:'error', summary:'Empty search!'})
    }
    
  }

  userPanel(){
    console.log('userPanel clicked');
  }
}
