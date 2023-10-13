import {Component, OnInit} from '@angular/core';
import {InseratArrayModel, InseratDataModel} from 'src/app/interfaces/inserat';
import { InseratService } from 'src/app/services/inserat.service';
import {AuthenticationService} from "../../services/authentication.service";
import {CommonFunctionsService} from "../../services/common-functions.service";

@Component({
  selector: 'app-inserat',
  templateUrl: './inserat.component.html',
  styleUrls: ['./inserat.component.css']
})
export class InseratComponent implements OnInit {
  public inserate: InseratDataModel[] = [];
  public filteredInserate: InseratDataModel[] = [];
  public searchInput: string = "";

  constructor(private inseratService: InseratService,
              public authenticationService: AuthenticationService,
              private commonFunctionsService: CommonFunctionsService) { }

  ngOnInit(): void {
    this.getInserate();
  }

  private getInserate(): void {
    //if enough time change to single object
    this.inseratService.getInserate().subscribe((inserate: InseratArrayModel) =>{
    //only use data
    this.inserate = inserate.data;
    // initial push to filteredInserate
    this.filteredInserate = this.inserate;
    });
  }

  private searchForInserat(items: any[], searchText: string): any[] {
    return this.commonFunctionsService.searchInsideOfArray(items, searchText)
  }

  public getFirstImage(inserat: InseratDataModel){
    const imgPathArray = inserat.attributes.imgPath.split(',');
    return "http://localhost:1337"+imgPathArray[0];
  }

  public onSearch(event: any){
    // only search if the search input has more than 3 characters
    if (event.target.value.length > 2){
      const inseratSearch = [];
      for (let i = 0; i < this.inserate.length; i++) {
        const inseratTitleList = [];
        inseratTitleList.push(this.inserate[i].attributes.title);
        if(this.searchForInserat(inseratTitleList, event.target.value).length > 0){
          inseratSearch.push(this.inserate[i]);
        }
      }
      if(inseratSearch.length > 0){
        this.filteredInserate = inseratSearch;
      }
    }else {
      this.filteredInserate = this.inserate;
    }
  }

  public onFilterInserate(){
    const filterSelectOption : any = document.getElementById("filterOptions");
    switch (filterSelectOption.value) {
      case 'titleAscending':
        //sort title ascending
        this.filteredInserate.sort((a,b) => a.attributes.title.localeCompare(b.attributes.title));
        break;
      case 'titleDescending':
        //sort title descending
        this.filteredInserate.sort((a,b)=> b.attributes.title.localeCompare(a.attributes.title));
        break;
      case 'priceAscending':
        this.filteredInserate.sort((a,b) =>  (a.attributes.price > b.attributes.price ? 1:-1));
        break;
      case 'priceDescending':
        this.filteredInserate.sort((a,b) => (a.attributes.price > b.attributes.price ? -1 : 1));
        break;
      default:
        //sort title ascending
        this.filteredInserate.sort((a,b) => a.attributes.title.localeCompare(b.attributes.title));
        break;
    }
  }

  public getPrice(price: number): string{
    return this.commonFunctionsService.getPrice(price);
  }

  // TODO -> check doesnt work properly yet
  public checkIfUndefinedOrNull(): boolean {
    return this.commonFunctionsService.checkIfUndefinedOrNull(this.inserate);
  }
}
