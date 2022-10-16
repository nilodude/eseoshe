import { isPlatformServer } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Box, Cell } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eseoshe';
  _1x1 = new Box();
  _2x1 = new Box();
  _1x2 = new Box();
  boxesType: any;
  boxPool: Box[] = [];
  boxes: Box[] = [];
  pos: any;
  idCount: number = 0;

  constructor(){
    this.pos = [];
    
  }
  ngOnInit(){
    this._2x1.ylen = 1;
    this._2x1.tag = '2x1';
    
    this._1x2.xlen = 1;
    this._1x2.tag = '1x2';

    this._1x1.tag = '1x1';

    this.boxesType= {'1x1': this._1x1, '1x2': this._1x2, '2x1': this._2x1};
    this.boxPool =  [this._1x1];

    for(let y =0; y< 10 ;y++){
      for(let x =0; x< 10 ;x++){
        if(this.itsFree(x,y)){
          this.placeBox(x,y);
          //this.applyStyle(x,y);
        }
      }
    }
    
  }

  itsFree(x:number, y:number){
    let isit = false;
    isit = x<9 && y<9;
    let exists = this.pos.length > 0 && this.pos[y] != undefined && this.pos[y][x] != undefined;
    
    return isit && (!exists || (exists && this.pos[y][x].free));
  }

  placeBox(x0:number, y0:number){
    let box = this.getRandomBox(x0,y0);
    box.boxID = this.idCount++;
    this.boxes.push(box);
    console.log('new ' + box.tag);

    for(let y =y0; y<= y0 + box.ylen ;y++){
      let row = this.pos[y] ? this.pos[y] : [];
      for(let x =x0; x<= x0 + box.xlen ;x++){
        let cell = new Cell(x,y);
        cell.boxID = box.boxID;
        cell.free = false;
        cell.color = box.color;
        box.cells.push(cell);
        row[x]=cell;
        console.log('new cell x:'+x+',y:'+y);

      }
      this.pos[y] = row;
    }
    
  }

  getRandomBox(x0:number, y0:number){
    this.boxPool =  [this._1x1];
    console.log(''+x0+','+y0)
    let box;

    if(this.itsFree(x0+1,y0)){
      this.boxPool.push(this.boxesType['1x2']);
    }else if(this.itsFree(x0,y0+1)){
      this.boxPool.push(this.boxesType['2x1']);
    }
    const rand = this.random(this.boxPool.length);
    box = this.boxPool[rand];
    box.color = this.getRandomColor();
    return box;
  }

  getRandomColor(){
    const r = this.random(255);
    const g = this.random(255);
    const b = this.random(255);
    const sr = r/this.random(4);
    const sg = g/this.random(4);
    const sb = b/this.random(4);

    return 'rgb('+sr+', '+sg+', '+sb+')';
  }

  random(max: number){
    return Math.floor(Math.random() * max);
  }

  applyStyle(x:number, y:number){
    const cell = document.getElementsByClassName('box'+this.pos[y][x].boxID);
    
    if(cell){
      const box = this.boxes.find(b=>b.boxID === this.pos[y][x].boxID );
      if(box){
        cell//.style.backgroundColor = box.color;
      }
    }
  }

  }
