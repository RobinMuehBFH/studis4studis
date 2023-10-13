import { Component, OnInit } from '@angular/core';
import {NachhilfeService} from "../../services/nachhilfe.service";
import {NachhilfeDataModel, NachhilfeModel} from "../../interfaces/nachhilfe";
import {AuthenticationService} from "../../services/authentication.service";
import {CommonFunctionsService} from "../../services/common-functions.service";

@Component({
  selector: 'app-nachhilfe',
  templateUrl: './nachhilfe.component.html',
  styleUrls: ['./nachhilfe.component.css']
})
export class NachhilfeComponent implements OnInit {

  nachhilfen: NachhilfeDataModel[] = [];
  filteredNachhilfen: NachhilfeDataModel[] = [];
  searchInput: string | undefined;

  constructor(private nachhilfeService: NachhilfeService,
              private commonFunctionsService: CommonFunctionsService,
              public authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getNachhilfen();
  }

  private getNachhilfen(){
    this.nachhilfeService.getNachhilfen().subscribe((nachhilfen: NachhilfeModel) =>{
      this.nachhilfen = nachhilfen.data;
      this.filteredNachhilfen = this.nachhilfen;
    });
  }

  private searchForNachhilfe(items: any[], searchText: string): any[] {
    return this.commonFunctionsService.searchInsideOfArray(items,searchText);
  }

  public getPrice(price: number): string{
    return this.commonFunctionsService.getPrice(price);
  }

  public onFilterNachhilfen(){
    const filterSelectOption : any = document.getElementById("filterOptions");
    switch (filterSelectOption.value) {
      case 'titleAscending':
        //sort title ascending
        this.filteredNachhilfen.sort((a,b) => a.attributes.title.localeCompare(b.attributes.title));
        break;
      case 'titleDescending':
        //sort title descending
        this.filteredNachhilfen.sort((a,b)=> b.attributes.title.localeCompare(a.attributes.title));
        break;
      case 'priceAscending':
        this.filteredNachhilfen.sort((a,b) =>  (a.attributes.hourlyWage > b.attributes.hourlyWage ? 1 : -1));
        break;
      case 'priceDescending':
        this.filteredNachhilfen.sort((a,b) => (a.attributes.hourlyWage > b.attributes.hourlyWage ? -1 : 1));
        break;
      default:
        //sort title ascending
        this.filteredNachhilfen.sort((a,b) => a.attributes.title.localeCompare(b.attributes.title));
        break;
    }
  }

  public onSearch(event: any){
    // only search if the search input has more than 3 characters
    if (event.target.value.length > 2){
      const nachhilfeSearch = [];
      for (let i = 0; i < this.nachhilfen.length; i++) {
        const nachhilfenTitleList = [];
        nachhilfenTitleList.push(this.nachhilfen[i].attributes.title);
        if(this.searchForNachhilfe(nachhilfenTitleList, event.target.value).length > 0){
          nachhilfeSearch.push(this.nachhilfen[i]);
        }
      }
      if(nachhilfeSearch.length > 0){
        this.filteredNachhilfen = nachhilfeSearch;
      }
    }else {
      this.filteredNachhilfen = this.nachhilfen;
    }
  }
}
