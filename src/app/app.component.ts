import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eseoshe';
  randis: number[] = [];
  randos: number[] = [];

  constructor(){
    
  }
  ngOnInit(){
    this.randis = [];

    for(let i =0; i< 20 ;i++){
      let rand = this.random(1,3);
      if(i>0 && rand == this.randis[i-1]){
        if(rand > 3){
          rand--;
        }else{
          rand++;
        }
      }
      this.randis.push(rand);
    }
  
  }

  random(min:number, max: number){
    return Math.floor(min+(Math.random() * max));
  }

  }
