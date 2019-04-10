import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TerminalService } from './terminal/terminal.service';
import { RouterModule } from '@angular/router';
import appRoutes from './app.routing';
import { SharedModule } from './shared/shared.module';
import { CvModule } from './pages/cv/cv.module';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      appRoutes
    ),
    SharedModule
  ],
  providers: [TerminalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
