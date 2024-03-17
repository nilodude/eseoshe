import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Message, SelectItem } from 'primeng/api';
import { environment } from './../../environments/environment';
import { ColorButtonsComponent } from '../color-buttons/color-buttons.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class HeaderComponent implements OnInit {
  @Input() collectionID: number = 0;
  @Input() imageName: string = '';
  @Input() keywords: string= ''
  @Input() view: string='';
  @Input() isDataRetrieved: boolean=false;
  @Input() numResults: number = 0;
  @Input() msgs: Message[] = []
  @Input() collections: SelectItem[] =[];

  @ViewChild(ColorButtonsComponent) colorButtons!:ColorButtonsComponent;

  fullTitle: boolean = false;
  collection: SelectItem = {label:'', value:''};

  images: any[] = [];

  searchForm = new FormGroup({
    keywords: new FormControl(''),
  });

  

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
      this.msgs = []
      this.msgs.push({severity:'error', summary:'Empty search!'})
    }
    
  }

  toggleButtons(){
    this.colorButtons.toggleButtons()
  }

  userPanel(){
    console.log('userPanel clicked');
  }
}
