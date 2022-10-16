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
  width: number = 6;
  height: number = this.width;

  _1x1 = new Box();
  _2x1 = new Box();
  _1x2 = new Box();
  _2x2 = new Box();
  _1x3 = new Box();
  _2x3 = new Box();
  _3x2 = new Box();

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

    this._1x3.xlen = 2;
    this._1x3.tag = '2x3';

    this._2x2.xlen = 1;
    this._2x2.ylen = 1;
    this._2x2.tag = '2x2';

    this._2x3.xlen = 2;
    this._2x3.ylen = 1;
    this._2x3.tag = '2x3';

    this._3x2.xlen = 1;
    this._3x2.ylen = 2;
    this._3x2.tag = '3x2';

    this.boxesType= {'1x1': this._1x1, '1x2': this._1x2, '2x1': this._2x1, '2x2': this._2x2,'1x3': this._1x3, '2x3': this._2x3, '3x2': this._3x2};
    this.boxPool =  [this._1x1];

    for(let y =0; y< this.height ;y++){
      for(let x =0; x< this.width ;x++){
        if(this.itsFree(x,y)){
          this.placeBox(x,y);
        }
      }
    }
    
  }

  itsFree(x:number, y:number){
    let withinBounds = false;
    withinBounds = x<this.width -1 && y<this.height-1;
    let exists = this.pos.length > 0 && this.pos[y] != undefined && this.pos[y][x] != undefined;
    
    return withinBounds && (!exists || (exists && this.pos[y][x].free));
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

    if(this.itsFree(x0,y0+1)){
      this.boxPool.push(this.boxesType['2x1']);
      if(this.itsFree(x0+1,y0) && this.itsFree(x0+1,y0+1)){
        this.boxPool.push(this.boxesType['2x2']);
      }
    }
    if(this.itsFree(x0+1,y0)){
      this.boxPool.push(this.boxesType['1x2']);
      if(this.itsFree(x0+2,y0)){
        this.boxPool.push(this.boxesType['1x3']);
        if(this.itsFree(x0+1,y0+1) && this.itsFree(x0+1,y0+2)){
          this.boxPool.push(this.boxesType['2x3']);
        }
      }
    }
   
    if(this.itsFree(x0+1,y0) && this.itsFree(x0+2,y0)){
      this.boxPool.push(this.boxesType['1x3']);
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
