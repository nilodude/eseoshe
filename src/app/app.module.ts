import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CrazygridComponent } from './crazygrid/crazygrid.component';
import {ButtonModule} from 'primeng/button';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import {DialogModule} from 'primeng/dialog';
import { ImageComponent } from './image/image.component';
import {TooltipModule} from 'primeng/tooltip';
import { ColorButtonsComponent } from './color-buttons/color-buttons.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { AdminComponent } from './admin/admin.component';
import {Messages, MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ProgressBarModule} from 'primeng/progressbar';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CrazygridComponent,
    HomeComponent,
    GalleryComponent,
    ImageComponent,
    ColorButtonsComponent,
    BreadcrumbComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DialogModule,
    TooltipModule,
    HttpClientModule,
    MessageModule,
    MessagesModule,
    ProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
