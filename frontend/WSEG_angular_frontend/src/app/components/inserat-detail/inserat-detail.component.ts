import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {InseratService} from "../../services/inserat.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import { Lightbox } from 'ngx-lightbox';
import {AuthenticationService} from "../../services/authentication.service";
import {InseratDataModel, InseratModel} from "../../interfaces/inserat";
import {UserModel} from "../../interfaces/user";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommonFunctionsService} from "../../services/common-functions.service";

@Component({
  selector: 'app-inserat-detail',
  templateUrl: './inserat-detail.component.html',
  styleUrls: ['./inserat-detail.component.css']
})
export class InseratDetailComponent implements OnInit {
  private inseratId: number = 0;
  private albums:any[] = [];
  public inserat: InseratDataModel | undefined;
  public user: UserModel | undefined;
  public checkoutForm : FormGroup | undefined;


  constructor(public dialog: MatDialog,
              private inseratService: InseratService,
              private route: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private datePipe: DatePipe,
              private _lightbox: Lightbox,
              private router: Router,
              private formBuilder: FormBuilder,
              private commonFunctionsService: CommonFunctionsService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.inseratId = params['id'];
    });
    this.getInseratById(this.inseratId);
  }

  private getInseratById(id: number){
    this.inseratService.getInserateById(id).subscribe((inserat: InseratModel) => {
      this.inserat = inserat.data;
      if(this.inserat){
        for (let imgPath of this.inserat.attributes.imgPath.split(",")){
          this.albums.push({src: 'http://localhost:1337'+imgPath, caption: "inserat img", thumb: imgPath});
        }
      }
      //set inserat user
      if (this.inserat && this.inserat.attributes){
        this.user = this.inserat.attributes.user.data;
      }
      this.checkoutForm = this.formBuilder.group({
        title: this.inserat.attributes.title,
        subtitle: this.inserat.attributes.subtitle,
        description: this.inserat.attributes.description,
        state: this.inserat.attributes.state,
        price: this.inserat.attributes.price,
        imgPath: this.inserat.attributes.imgPath
      });
    });
  }

  private editInserat() {
    if(this.checkoutForm){
      const inseratUpdateData = {
        data: {
          title: this.checkoutForm.value.title,
          subtitle: this.checkoutForm.value.subtitle,
          description: this.checkoutForm.value.description,
          state: this.checkoutForm.value.state,
          price: this.checkoutForm.value.price,
          imgPath: this.checkoutForm.value.imgPath,
        }
      }
      this.inseratService.editInserat(inseratUpdateData, this.inseratId).subscribe((message: any) => {
        this.getInseratById(this.inseratId);
        this.dialog.closeAll();
      });
    }
  }

  public openDialog(templateUrl: any): void {
    this.dialog.open(templateUrl,{
      width:'60%'
    });
  }

  public returnDate(date: any) {
    return this.datePipe.transform(date, 'dd.MM.yyyy / HH:mm');
  }

  public open(index: number): void {
    // open lightbox
    this._lightbox.open(this.albums, index);
  }

  public close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  public getFirstImage(inserat: any){
    const imgPathArray = inserat.attributes.imgPath.split(',');
    return "http://localhost:1337"+imgPathArray[0];
  }

  public getPrice(price: number){
    return this.commonFunctionsService.getPrice(price);
  }

  public isOwnerOfInserat(){
    if (this.inserat){
      return (this.authenticationService.getCurrentUser() && this.authenticationService.getCurrentUser().user.id == this.inserat.attributes.user.data.id);
    }
  }

  public deleteInserat(){
    this.inseratService.deleteInseratById(this.inseratId).subscribe((respones) => {
      this.router.navigate(['/inserat']);
    });
  }

  public onSubmit() {
    if(this.checkoutForm){
      for (let prop in this.checkoutForm.value) {
        //if same as before return "" so that there are no changes in strapi
        // @ts-ignore
        if(this.checkoutForm.value[prop] == this.inserat.attributes[prop]){
          this.checkoutForm.value[prop] = undefined;
        }
      }
      this.editInserat();
    }
  }
}
