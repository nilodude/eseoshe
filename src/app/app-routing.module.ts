import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ImageComponent } from './image/image.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category', component: GalleryComponent },
  { path: 'image', component: ImageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
