import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumComponent } from './components/forum/forum.component';
import { InseratCreationComponent } from './components/inserat-creation/inserat-creation.component';
import { InseratDetailComponent } from './components/inserat-detail/inserat-detail.component';
import { InseratComponent } from './components/inserat/inserat.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/login/login.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { NachhilfeCreationComponent } from './components/nachhilfe-creation/nachhilfe-creation.component';
import { NachhilfeDetailComponent } from './components/nachhilfe-detail/nachhilfe-detail.component';
import { NachhilfeComponent } from './components/nachhilfe/nachhilfe.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'inserat', component: InseratComponent},
  { path: 'nachhilfe', component: NachhilfeComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'login', component: LoginComponent },
  { path: 'inserat-detail/:id', component: InseratDetailComponent },
  { path: 'nachhilfe-detail/:id', component: NachhilfeDetailComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'inserat-creation', component: InseratCreationComponent },
  { path: 'nachhilfe-creation', component: NachhilfeCreationComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: '', component: InseratComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
