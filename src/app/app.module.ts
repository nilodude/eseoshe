import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CrazygridComponent } from './crazygrid/crazygrid.component';
import {ButtonModule} from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule }   from '@angular/forms';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CrazygridComponent,
    HomeComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
