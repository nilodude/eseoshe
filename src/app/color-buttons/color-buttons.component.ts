import { Component, OnInit } from '@angular/core';
import { ApiService } from './../services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-color-buttons',
  templateUrl: './color-buttons.component.html',
  styleUrls: ['./color-buttons.component.scss']
})
export class ColorButtonsComponent implements OnInit {

  buttonInfo: any = [
    {
      class: "btn-red-grad",
      label: 'Red'
    },
    {
      class: "btn-orange-grad",
      label: 'orange'
    },
    {
      class: "btn-yellow-grad",
      label: 'yellow'
    },
    {
      class: "btn-green-grad",
      label: 'green'
    },
    {
      class: "btn-cyan-grad",
      label: 'cyan'
    },
    {
      class: "btn-blue-grad",
      label: 'blue'
    },
    {
      class: "btn-purple-grad",
      label: 'purple'
    },
    {
      class: "btn-magenta-grad",
      label: 'magenta'
    },
    {
      class: "btn-brown-grad",
      label: 'brown'
    },
    {
      class: "btn-black-grad",
      label: 'black'
    },
    {
      class: "btn-grey-grad",
      label: 'grey'
    },
    {
      class: "btn-white-grad",
      label: 'white'
    },
    {
      class: "btn-rainbow-grad",
      label: 'multi'
    },
  ]


  constructor(private router: Router,private apiService: ApiService) { }

  ngOnInit(): void {
  }

  click(color: string){
    console.log(color)
    localStorage.setItem('keywords',color);
   
    if(this.router.url == '/keywords'){
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate(['/keywords']));
    }else{
      this.router.navigate(['/keywords'])
    }
  }
}
