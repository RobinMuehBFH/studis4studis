import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  private formdata: FormData | undefined;
  public fileSet: boolean = false;
  public user: any | undefined;
  public allCurrentUserInfos: any | undefined; // includes the profilepicturepath

  constructor(private authenticationService: AuthenticationService,
              private router: Router) { }

  ngOnInit(): void {
    if(this.authenticationService.getCurrentUser()){
      this.user = this.authenticationService.getCurrentUser().user;
    } else {
      this.router.navigate(['/login']);
    }
    this.getAllCurrentUserInfos();
  }

  private getAllCurrentUserInfos() {
    this.authenticationService.getAllCurrentUserInformation().subscribe(allUserInfos => {
      this.allCurrentUserInfos = allUserInfos;
    });
  }

  public logout(){
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public uploadImage() {
    //it has to upload the images first, which is why it has to go through this function first.
    if(this.formdata){
      this.authenticationService.uploadProfilePicutre(this.formdata).subscribe((images:any) => {
        this.authenticationService.updateProfilePicture(images[0].url, this.user.id).subscribe((message) => {
          this.getAllCurrentUserInfos();
        });
      });
    }
  }

  public prepareImage(event: any) {
    this.fileSet = true;
    this.formdata = undefined;
    const files = event.target.files;
    if (files){
      this.formdata = new FormData();
      for (let file of files){
        this.formdata.append('files', file);
      }
    }
  }

  public submit() {
   this.uploadImage();
  }
}
