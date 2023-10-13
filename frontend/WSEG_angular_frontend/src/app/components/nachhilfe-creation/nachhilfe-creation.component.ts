import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {NachhilfeService} from "../../services/nachhilfe.service";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-nachhilfe-creation',
  templateUrl: './nachhilfe-creation.component.html',
  styleUrls: ['./nachhilfe-creation.component.css']
})
export class NachhilfeCreationComponent implements OnInit {
  private formdata: FormData | undefined;
  public checkoutForm = this.formBuilder.group({
    title: '',
    modul: '',
    description: '',
    img: undefined,
    hourlyWage: ''
  });

  constructor(private nachhilfeService: NachhilfeService,
              private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  private addNachhilfe(imgPathString: string): void {
    const nachhilfeCreationData = {
      data: {
        title: this.checkoutForm.value.title,
        modul: this.checkoutForm.value.modul,
        description: this.checkoutForm.value.description,
        imgPath: imgPathString,
        hourlyWage: this.checkoutForm.value.hourlyWage,
        user: this.authenticationService.getCurrentUser().user.id
      }
    }
    this.nachhilfeService.addNachhilfe(nachhilfeCreationData).subscribe((message: any) =>{
      this.router.navigate(['/nachhilfe']);
    });
  }

  public uploadImages() {
    //it has to upload the images first, which is why it has to go through this function first.
    const imgPathArray: string[] = [];
    if(this.formdata){
      this.nachhilfeService.uploadImages(this.formdata).subscribe((images:any) => {
        //for loop to get all images -> put them into an array
        for (let image of images){
          imgPathArray.push(image.url);
          this.addNachhilfe(imgPathArray.toString());
        }
      });
    }else {
      this.addNachhilfe('');
    }
  }

  public prepareImages(event: any){
    this.formdata = undefined;
    const file = event.target.files[0];
    if(file) {
      this.formdata = new FormData();
      this.formdata.append('files', file);
    }
  }

  public onSubmit() {
    this.uploadImages();
  }
}
