import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public checkoutForm = this.formBuilder.group({
    email: '',
    username: '',
    password: '',
    passwordConfirmation: ''
  });

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private router: Router,) { }

  ngOnInit(): void {
  }

  public registerNewUser(){
    this.authenticationService.register(this.checkoutForm).subscribe((message:any) => {
      this.router.navigate(['/login']);
    });
  }
}
