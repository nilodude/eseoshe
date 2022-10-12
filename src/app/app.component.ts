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

    this.randis.push(this.random(1,3));
    this.randis.push(this.random(2,2));
    this.randis.push(this.random(1,2));
    this.randis.push(this.random(2,2));

    this.randis.push(12-(this.randis[0]+this.randis[1]+this.randis[2]+this.randis[3]));
  }

  random(min:number, max: number){
    return Math.floor(min+(Math.random() * max));
  }

  }
