import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { cvRoutes } from './cv.routing';
import { SharedModule } from 'src/app/shared/shared.module';
import { IndexComponent } from './index/index.component';
import { NavComponent } from './nav/nav.component';
import { TechnicalSkillsComponent } from './technical.skills/technical.skills.component';

@NgModule({
  declarations: [IndexComponent, NavComponent, TechnicalSkillsComponent],
  imports: [
    RouterModule.forChild(cvRoutes),
    CommonModule,
    SharedModule
  ]
})
export class CvModule { }
