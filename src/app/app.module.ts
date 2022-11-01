import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CrazygridComponent } from './crazygrid/crazygrid.component';
import {ButtonModule} from 'primeng/button';
import { ColorButtonsComponent } from './color-buttons/color-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CrazygridComponent,
    ColorButtonsComponent
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
