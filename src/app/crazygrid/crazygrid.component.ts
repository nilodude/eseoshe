import { Component, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { Box, Cell } from '../models';

@Component({
  selector: 'app-crazygrid',
  templateUrl: './crazygrid.component.html',
  styleUrls: ['./crazygrid.component.scss']
})
export class CrazygridComponent implements OnInit {

  @Input('cols') width: number = 7;
  @Input('rows') height: number = 4;
  @Input('scale') windowScale: number = 7.15;
  //[scale]="7.15" ocupa toda la pantalla
  @Input('outerMargin') margin: string = '0%';
  @Input('innerMargin') boxPadding: number = 18;

  title = 'CrazyGrid';
    
  scale: number = window.innerWidth /this.windowScale;
  contenido: string = '<p-button (onClick)="this.like(b.boxID)" icon="pi pi-heart" styleClass="p-button-outlined p-button-rounded p-button-help"><button pripple="" class="p-ripple p-element p-button-outlined p-button-rounded p-button-help p-button p-component p-button-icon-only" ng-reflect-ng-class="[object Object]" type="button"><!--bindings={}--><span class="pi pi-heart p-button-icon" ng-reflect-ng-class="[object Object]" aria-hidden="true"></span><!--bindings={   "ng-reflect-ng-if": "pi pi-sync"  }--><span class="p-button-label" aria-hidden="true">&nbsp;</span><!--bindings={    "ng-reflect-ng-if": "true"  }--><!--bindings={}--></button></p-button><p-button (onClick)="this.zoom(b.boxID)" icon="pi pi-search-plus"  styleClass="p-button-outlined p-button-rounded p-button-help"><button pripple="" class="p-ripple p-element p-button-outlined p-button-rounded p-button-help p-button p-component p-button-icon-only" ng-reflect-ng-class="[object Object]" type="button"><!--bindings={}--><span class="pi pi-search-plus p-button-icon" ng-reflect-ng-class="[object Object]" aria-hidden="true"></span><!--bindings={    "ng-reflect-ng-if": "pi pi-sync"  }--><span class="p-button-label" aria-hidden="true">&nbsp;</span><!--bindings={    "ng-reflect-ng-if": "true"  }--><!--bindings={}--></button></p-button>'
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

  
  constructor(
    private renderer:Renderer2, 
  ){
    this.cells = [];
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
    
  }
  ngOnInit(){
    this.boxes= [];
    this.cells= [];
    this.idCount= 0;
    this.boxesPlaced = false;

    
    this.scale = window.innerWidth /this.windowScale;
    
    this.boxPool =  [this._1x1];

    for(let y =0; y<= this.height ;y++){
      for(let x =0; x<= this.width ;x++){
        if(this.itsFree(x,y)){
          this.placeBox(x,y);
        }
        this.boxesPlaced = (y === (this.height ) && x === (this.width ));
      }
    }

    if(this.boxesPlaced){
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
    withinBounds = x<this.width  && y<this.height;
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
    let boxPadding = this.boxPadding;
    const scale = this.scale;
    
    let eldiv = document.getElementById("eldiv");
    if (eldiv != null) {
      eldiv.innerHTML = '';
      this.boxes.forEach(box => {
        if (eldiv != null && this.cells) {
          let newBox = document.createElement("div");
          let newImg = document.createElement("img");
          let newTitle = document.createElement("h2");
                   
          //TITLE
          newTitle.innerHTML= 'LA CAJITA '+box.boxID.toString();
          newTitle.style.position = 'absolute';
          newTitle.style.top = '41%';
          newTitle.style.left= '50%';
          newTitle.style.transform =  'translate(-50%, -50%)';
          newTitle.style.color = 'rgba(1,1,1,0.7)';
          newTitle.style.font = 'small-caps bold 18px/30px Verdana';
          newTitle.style.textAlign = 'center';
          newTitle.style.whiteSpace = 'nowrap';
          newTitle.style.background = 'rgba(255,255,255,1)';
          newTitle.style.borderRadius = scale/20 +'px';
          newTitle.style.boxShadow = 'rgb(100,100,100,0.4) -5px 2px 7px inset, rgb(100,100,100,0.6) 5px -2px 7px inset';
          newTitle.style.width = '180px';
          //newTitle.style.border = '0.1px gray';
          //DIMENSIONS
          const w = box.xlen + 1;
          const h = box.ylen + 1;
          newBox.style.width = (scale * w).toString() + 'px';
          newBox.style.height = (scale * h).toString() + 'px';
          newImg.style.width = (scale * w - boxPadding) + 'px';
          newImg.style.height = (scale * h - boxPadding)+ 'px';
          //POSITION
          const x = box.cells[0].x;
          const y = box.cells[0].y;
          newBox.style.position = "absolute";
          newBox.style.transform = "translate(" + scale*x  + "px, " + scale * y + "px)";
          //image itself
          newImg.style.position = "realtive";
          newImg.style.background = "url(../../assets/" + box.boxID + ".jpg)";
          newImg.style.backgroundRepeat = 'round';
          const bgScale = 100;
          const bgW = (bgScale / (box.xlen + 1)).toString();
          const bgH = (bgScale / (box.ylen + 1)).toString();
          newImg.style.backgroundSize = bgW + '%' + bgH + '%';
          newImg.style.borderRadius = scale/13 +'px';
          newImg.style.marginLeft = 'auto';
          newImg.style.marginRight = 'auto';
          newImg.style.display = 'block';
          newImg.style.boxShadow = 'rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px';

          //ONMOUSEOVER
          newImg.onmouseover = ()=>this.mouseOver();
          newImg.onmouseout = ()=>this.mouseOut();
          
          //BUTTONS
          let buttons = document.createElement("div");
          const idLike = 'buttons' + box.boxID;
          buttons.id = idLike;
          buttons.style.position = 'absolute';
          buttons.style.top = '20%';
          buttons.style.left = '80%';
          buttons.style.transform = 'translate(-10%, -80%)';
          buttons.style.zIndex = '1007';
          buttons.innerHTML = this.contenido;

          newBox.appendChild(buttons);
          newBox.appendChild(newImg);
          eldiv.appendChild(newBox);
        }
      });
      eldiv.style.margin = this.margin;
      // eldiv.style.marginLeft = 'auto';
      // eldiv.style.marginRight = 'auto';
      // eldiv.style.display = 'block';

    }
  }

  mouseOver(){
    
  }

  mouseOut(){
    
  }
  like(boxID: number){
    console.log('liked box '+boxID);
  }

  zoom(boxID: number){
    console.log('zoomed box '+boxID);
  }

  refresh(){
    console.log('onini')
    this.ngOnInit();
  }
}
