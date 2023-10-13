import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {ActivatedRoute, Router} from "@angular/router";
import {NachhilfeService} from "../../services/nachhilfe.service";
import {DatePipe} from "@angular/common";
import {AuthenticationService} from "../../services/authentication.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserModel} from "../../interfaces/user";
import {CommonFunctionsService} from "../../services/common-functions.service";

@Component({
  selector: 'app-nachhilfe-detail',
  templateUrl: './nachhilfe-detail.component.html',
  styleUrls: ['./nachhilfe-detail.component.css']
})
export class NachhilfeDetailComponent implements OnInit {

  public checkoutForm : FormGroup | undefined;
  private nachhilfeId = 0;
  // TODO add correct model
  public nachhilfe: any;
  public user: UserModel | undefined;

  constructor(public dialog: MatDialog,
              private nachhilfeService: NachhilfeService,
              private route: ActivatedRoute,
              private datePipe: DatePipe,
              public authenticationService: AuthenticationService,
              private router: Router,
              private formBuilder: FormBuilder,
              private commonFunctionsService: CommonFunctionsService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.nachhilfeId = params['id'];
    });
    this.getNachhilfeById(this.nachhilfeId);
  }

  private editNachhilfe() {
    if(this.checkoutForm){
      const nachhilfeUpdateData = {
        data: {
          title: this.checkoutForm.value.title,
          modul: this.checkoutForm.value.modul,
          description: this.checkoutForm.value.description,
          hourlyWage: this.checkoutForm.value.hourlyWage,
          imgPath: this.checkoutForm.value.imgPath,
        }
      }
      this.nachhilfeService.editNachhilfe(nachhilfeUpdateData, this.nachhilfeId).subscribe((message: any) => {
        this.getNachhilfeById(this.nachhilfeId);
        this.dialog.closeAll();
      });
    }
  }

  private getNachhilfeById(id: number){
    this.nachhilfeService.getNachhilfeById(id).subscribe((nachhilfe: any) => {
      this.nachhilfe = nachhilfe.data;
      this.checkoutForm = this.formBuilder.group({
        title: this.nachhilfe.attributes.title,
        modul: this.nachhilfe.attributes.modul,
        description: this.nachhilfe.attributes.description,
        hourlyWage: this.nachhilfe.attributes.hourlyWage,
        imgPath: this.nachhilfe.attributes.imgPath
      });
      this.user = this.nachhilfe.attributes.user.data;
    });
  }

  public openDialog(templateUrl: any): void {
    this.dialog.open(templateUrl,{
      width:'60%'
    });
  }

  public getFirstImage() {
    return "http://localhost:1337"+this.nachhilfe.attributes.imgPath;
  }

  public returnDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy / HH:mm');
  }

  public isOwnerOfNachhilfe(){
    return (this.authenticationService.getCurrentUser() && this.authenticationService.getCurrentUser().user.id == this.nachhilfe.attributes.user.data.id);
  }

  public deleteNachhilfe() {
    this.nachhilfeService.deleteNachhilfeById(this.nachhilfe.id).subscribe(_=>{
      this.router.navigate(['/nachhilfe']);
    });
  }

  public onSubmit(){
    if(this.checkoutForm){
      for (let prop in this.checkoutForm.value) {
        //if same as before return "" so that there are no changes in strapi
        // @ts-ignore
        if(this.checkoutForm.value[prop] == this.nachhilfe.attributes[prop]){
          this.checkoutForm.value[prop] = undefined;
        }
      }
      this.editNachhilfe();
    }
  }

  public getPrice(price: number){
    return this.commonFunctionsService.getPrice(price);
  }
}
