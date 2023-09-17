import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  title = 'Eseoshe';

  cgRows: number = 4;
  cgCols: number = 7;
  cgScale: number = 7.15;

  constructor() { }

  ngOnInit(): void {
    if(window.innerWidth < 812){
      this.cgCols = 2;
      this.cgScale = 2.11;
    }
  }

}
