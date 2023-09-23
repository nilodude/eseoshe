import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  color: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  gotoAdmin(){
    this.router.navigate(['/admin']);
  }

}
