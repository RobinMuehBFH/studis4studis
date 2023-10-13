import { Component, OnInit } from '@angular/core';
import {InseratService} from "../../services/inserat.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-inserat-creation',
  templateUrl: './inserat-creation.component.html',
  styleUrls: ['./inserat-creation.component.css']
})
export class InseratCreationComponent implements OnInit {
  private formdata: FormData | undefined;
  public checkoutForm = this.formBuilder.group({
    title: '',
    subtitle: '',
    description: '',
    state: '',
    price: 0,
    img: undefined
  });

  constructor(private inseratService: InseratService,
              private formBuilder: FormBuilder,
              private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  private addInserat(imgPathString: string) {
    const inseratCreationData = {
      data: {
        title: this.checkoutForm.value.title,
        subtitle: this.checkoutForm.value.subtitle,
        description: this.checkoutForm.value.description,
        state: this.checkoutForm.value.state,
        price: this.checkoutForm.value.price,
        imgPath: imgPathString,
        user: this.authenticationService.getCurrentUser().user.id
      }
    }
    this.inseratService.addInserat(inseratCreationData).subscribe((message: any) =>{
      this.router.navigate(['/inserat']);
    });
  }

  private uploadImages() {
    //it has to upload the images first, which is why it has to go through this function first.
    const imgPathArray: string[] = [];
    if(this.formdata){
      this.inseratService.uploadImages(this.formdata).subscribe((images:any) => {
        //for loop to get all images -> put them into an array
        for (let image of images){
          imgPathArray.push(image.url);
        }
        this.addInserat(imgPathArray.toString());
      });
    }else {
      this.addInserat('');
    }
  }

  public onSubmit() {
    this.uploadImages();
  }

  public prepareImages(event: any){
    this.formdata = undefined;
    const files = event.target.files;
    if (files){
      this.formdata = new FormData();
      for (let file of files){
        this.formdata.append('files', file);
      }
    }
  }
}
