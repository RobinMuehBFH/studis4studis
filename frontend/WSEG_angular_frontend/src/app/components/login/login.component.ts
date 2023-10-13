import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public checkoutForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(public authenticationService: AuthenticationService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
  }

  public login(){
    this.authenticationService.login(this.checkoutForm).subscribe((user:any) => {
      this.router.navigate(['/inserat']);
    });
  }
}
