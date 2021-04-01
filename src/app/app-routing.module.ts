import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './components/about/about.component';
import { ImageDetailComponent } from './components/image-detail/image-detail.component';
import { LandingComponent } from './components/landing/landing.component';
import { MinCharacterLengthComponent } from './components/min-character-length/min-character-length.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'api/image/text/:search', component: SearchResultComponent
  },
  {
    path: 'api/image/id/:imageId', component: ImageDetailComponent
  },
  {
    path: 'min-length', component: MinCharacterLengthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
