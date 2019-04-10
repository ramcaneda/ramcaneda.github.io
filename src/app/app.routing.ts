import { Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';

const appRoutes: Routes = [
  {
    path: 'home', pathMatch:'full', component: HomeComponent
  },
  {
    path: 'cv', loadChildren: './pages/cv/cv.module#CvModule'
  },
  { path: '',   redirectTo: '/home', pathMatch: 'full' }
];

export default appRoutes;