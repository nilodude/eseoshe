import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CrazygridComponent } from './crazygrid/crazygrid.component';
import {ButtonModule} from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';

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
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
