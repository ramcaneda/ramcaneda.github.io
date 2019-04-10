import { Routes, RouterModule } from "@angular/router";
import { IndexComponent } from './index/index.component';
import { NavComponent } from './nav/nav.component';
import { TechnicalSkillsComponent } from './technical.skills/technical.skills.component';


const cvRoutes: Routes = [
  { path: '', component: IndexComponent,
    children: [
      { path: '', pathMatch: 'full', component: NavComponent },
      { path: 'technical-skills', component: TechnicalSkillsComponent }
    ]
  }
];

export default cvRoutes;