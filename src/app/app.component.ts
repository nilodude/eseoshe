import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eseoshe';
  randis: number[] = [];

  constructor(){
    
  }
  ngOnInit(){
    this.randis = [];
    this.randis.push(Math.floor(1+Math.random() * 9));
    this.randis.push(Math.floor(1+Math.random() * 9));
    this.randis.push(Math.floor(1+Math.random() * 9));
    this.randis.push(Math.floor(1+Math.random() * 9));
    this.randis.push(Math.floor(1+Math.random() * 9));

  }

  }
