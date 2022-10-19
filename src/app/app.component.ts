import { isPlatformServer } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { Box, Cell } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eseoshe';
  width: number = 8;
  height: number = 4;
  windowScale: number = 9;
  scale: number = window.innerWidth /this.windowScale;

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
  cells: any;
  idCount: number = 0;
  boxesPlaced: boolean = false;

  constructor(){
    this.cells = [];
    
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
        this.boxesPlaced = (y === (this.height -1) && x === (this.width -1));
      }
    }

    if(this.boxesPlaced){
      //console.log(this.boxes)
      this.arrange();
    }
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.scale = window.innerWidth /this.windowScale;
    this.arrange();
  }

  itsFree(x:number, y:number){
    let withinBounds = false;
    withinBounds = x<this.width -1 && y<this.height-1;
    let exists = this.cells.length > 0 && this.cells[y] != undefined && this.cells[y][x] != undefined;
    
    return withinBounds && (!exists || (exists && this.cells[y][x].free));
  }

  placeBox(x0:number, y0:number){
    let box = this.getRandomBox(x0,y0);
    box.boxID = this.idCount++;
    this.boxes.push(box);
    //console.log('new ' + box.tag);
    box.cells = [];
    for(let y =y0; y<= y0 + box.ylen ;y++){
      let row = this.cells[y] ? this.cells[y] : [];
      for(let x =x0; x<= x0 + box.xlen ;x++){
        let cell = new Cell(x,y);
        cell.boxID = box.boxID;
        cell.free = false;
        cell.color = box.color;
        box.cells.push(cell);
        row[x]=cell;
        //console.log('new cell x:'+x+',y:'+y);
      }
      this.cells[y] = row;
    }
  }

  getRandomBox(x0:number, y0:number){
    this.boxPool =  [this._1x1];
    //console.log(''+x0+','+y0)
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
    box = structuredClone(this.boxPool[rand]);
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


  
  arrange(){
    let margin = 50; //px
    let prevW = margin;

    const scale = this.scale;
    
    let eldiv = document.getElementById("eldiv");
    if (eldiv != null) {
      eldiv.innerHTML = '';
      this.boxes.forEach(box => {
        if (eldiv != null && this.cells) {
          var newBox = document.createElement("div");
          const w = box.xlen + 1;
          const h = box.ylen + 1;
          newBox.style.width = (scale * w).toString() + 'px';
          newBox.style.height = (scale * h).toString() + 'px';
          newBox.style.position = "absolute";
          const x = box.cells[0].x;
          const y = box.cells[0].y;

          if(x== 0){
            margin = 0;
          }else{
            // const prevBoxID = this.cells[y][x-1] ? this.cells[y][x-1].boxID : 99;
            // const prevBox = this.boxes.find(b=>b.boxID===prevBoxID);
            // prevW = 50;
            margin = margin + prevW;
            //margin = 50;
          }
          const newX = (scale*x)+margin;

          newBox.style.transform = "translate(" + newX  + "px, " + scale * y + "px)";
          newBox.style.border = '0px dashed yellow';
          newBox.style.background = "url(../../assets/" + box.boxID + ".jpg)";
          newBox.style.backgroundRepeat = 'round';
          const bgW = (100 / (box.xlen + 1)).toString();
          const bgH = (100 / (box.ylen + 1)).toString();
          newBox.style.backgroundSize = bgW + '%' + bgH + '%';
          
          // if(x == 0){
          //   prevW = 0;
          // }
          // const marginLeft = (margin +6*prevW/scale).toString() + 'px';
          // newBox.style.marginLeft = marginLeft;
          
          eldiv.appendChild(newBox);

          //la "verdadera" Box anterior, en realidad no es la anterior en el array, sino la que tiene del boxID de la Cell en la posicion x-1
         
        }
      });

      eldiv.style.margin = '10%';
    }
    
  }

  }
