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
  boxes: any;
  boxxes: Box[] = [];
  pos: any;
  idCount: number = 0;

  constructor(){
    this.pos = [];
    // for(let y =0; y< 10 ;y++){
    //   let row = [];
    //   for(let x =0; x< 10 ;x++){
    //     row.push(new Cell(x,y));
    //   }
    //   this.pos.push(row);
    // }
  }
  ngOnInit(){
    this._2x1.ylen = 1;
    this._2x1.tag = '2x1';
    
    this._1x2.xlen = 1;
    this._1x2.tag = '1x2';

    this._1x1.tag = '1x1';

    this.boxes= {'1x1': this._1x1, '1x2': this._1x2, '2x1': this._2x1};
    this.boxxes =  [this._1x1];

    for(let y =0; y< 10 ;y++){
      for(let x =0; x< 10 ;x++){
        if(this.itsFree(x,y)){
          this.placeBox(x,y);
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
  placeBox(x:number, y:number){
    let box = this.getRandomBox(x,y);

    
  }
  getRandomBox(x0:number, y0:number){
    console.log(''+x0+','+y0)
    let box;

    if(this.itsFree(x0+1,y0)){
      this.boxxes.push(this.boxes['1x2']);
    }else if(this.itsFree(x0,y0+1)){
      this.boxxes.push(this.boxes['2x1']);
    }
    const rand = this.random(0,2);
    box = this.boxxes[rand];
    box.id = this.idCount++;

    console.log('new box' + box.tag);

    for(let y =y0; y<= y0 + box.ylen ;y++){
      let row = this.pos[y] ? this.pos[y] : [];
      for(let x =x0; x<= x0 + box.xlen ;x++){
        let cell = new Cell(x,y);
        cell.boxID = box.id;
        cell.free = false;
        
        box.cells.push(cell);
        row[x]=cell;
        console.log('new cell: x='+x+'y='+y);
      }
      this.pos[y] = row;
    }

    return box;
  }


  random(min:number, max: number){
    return Math.floor(min+(Math.random() * max));
  }

  }
