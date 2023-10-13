import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private user: any;
  reload: boolean | undefined;

  constructor(public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links li");
    setTimeout(() => {
      if(hamburger && navLinks && links){
        hamburger!.addEventListener('click', ()=>{
          //Animate Links
          navLinks!.classList.toggle("open");
          links.forEach(link => {
              link.classList.toggle("fade");
          });

           //Hamburger Animation
           hamburger!.classList.toggle("toggle");
       });
       navLinks!.addEventListener('click', ()=>{
        //Animate Links
        navLinks!.classList.toggle("open");
        links.forEach(link => {
            link.classList.toggle("fade");
        });

         //Hamburger Animation
         hamburger!.classList.toggle("toggle");
     });
      }
    }, 1000);
  }
}
