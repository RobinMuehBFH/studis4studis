import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { InseratComponent } from './components/inserat/inserat.component';
import { NachhilfeComponent } from './components/nachhilfe/nachhilfe.component';
import { ForumComponent } from './components/forum/forum.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { InseratDetailComponent } from './components/inserat-detail/inserat-detail.component';
import {MatDialogModule} from '@angular/material/dialog';
import { NachhilfeDetailComponent } from './components/nachhilfe-detail/nachhilfe-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { InseratCreationComponent } from './components/inserat-creation/inserat-creation.component';
import { NachhilfeCreationComponent } from './components/nachhilfe-creation/nachhilfe-creation.component';
import {DatePipe} from "@angular/common";
import { LightboxModule } from 'ngx-lightbox';
import {MatIconModule} from '@angular/material/icon';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    InseratComponent,
    NachhilfeComponent,
    ForumComponent,
    LandingPageComponent,
    LoginComponent,
    InseratDetailComponent,
    NachhilfeDetailComponent,
    RegisterComponent,
    InseratCreationComponent,
    NachhilfeCreationComponent,
    MyprofileComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatCardModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        MatDialogModule,
        LightboxModule,
        MatIconModule,
        MatExpansionModule,
        MatProgressSpinnerModule,
        MatMenuModule
    ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
